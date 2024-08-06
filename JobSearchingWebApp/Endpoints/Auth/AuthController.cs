using Azure.Core;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Endpoints.Kompanija.Dodaj;
using Microsoft.Identity.Client;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.WebUtilities;

namespace JobSearchingWebApp.Endpoints.Auth
{
    [Route("")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Models.Korisnik> userManager;
        private readonly SignInManager<Models.Korisnik> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration config;
        private readonly JWTService jwtService; 
        private readonly EmailService emailService;

        public AuthController(UserManager<Models.Korisnik> userManager, SignInManager<Models.Korisnik> signInManager, IMapper mapper, IConfiguration config, JWTService jwtService, EmailService emailService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.config = config;
            this.jwtService = jwtService;
            this.emailService = emailService;   
        }

        [HttpPost("register/admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegistracijaRequest request)
        {
            return await RegisterUser<Models.Administrator, RegistracijaRequest>(request, "Admin", 1);
        }

        [HttpPost("register/kandidat")]
        public async Task<IActionResult> RegisterKandidat([FromBody] KandidatDodajRequest request)
        {
            return await RegisterUser<Models.Kandidat, KandidatDodajRequest>(request, "Kandidat", 2);
        }

        [HttpPost("register/kompanija")]
        public async Task<IActionResult> RegisterKompanija([FromBody] KompanijaDodajRequest request)
        {
            return await RegisterUser<Models.Kompanija, KompanijaDodajRequest>(request, "Kompanija", 3);
        }

        [HttpPut("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmail model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null) 
                return Unauthorized(new { message = "This email address has not been registered yet" } );

            if (user.EmailConfirmed == true) 
                return BadRequest(new { message = "Your email was confirmed before. Please login to your account" });

            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var result = await userManager.ConfirmEmailAsync(user, decodedToken);
                if (result.Succeeded)
                { 
                    return Ok(new JsonResult(new { title = "Email confirmed", message = "Your email address is confirmed. You can login now" }));
                }

                return BadRequest("Invalid token. Please try again");
            }
            catch (Exception)
            {
                return BadRequest("Invalid token. Please try again");
            }
        }

        [HttpPost("resend-email-confirmation-link/{email}")]
        public async Task<IActionResult> ResendEMailConfirmationLink(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Invalid email");
            var user = await userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("This email address has not been registerd yet");
            if (user.EmailConfirmed == true) return BadRequest("Your email address was confirmed before. Please login to your account");

            try
            {
                if (await SendConfirmEMailAsync(user))
                {
                    return Ok(new JsonResult(new { title = "Confirmation link sent", message = "Please confirm your email address" }));
                }

                return BadRequest("Failed to send email. PLease contact admin");
            }
            catch (Exception)
            {
                return BadRequest("Failed to send email. PLease contact admin");
            }
        }

        [Authorize]
        [HttpGet("refresh-token")]
        public async Task<ActionResult<AuthResponse>> RefereshToken()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.Email)?.Value);

            return new AuthResponse { JWT = await jwtService.CreateJWT(user), };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user == null) return Unauthorized(new { message = "Invalid username or password" });

            if (user.EmailConfirmed == false) return Unauthorized(new { message = "Please confirm your email." });

            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            //if (result.IsLockedOut)
            //{
            //    return Unauthorized(string.Format("Your account has been locked. You should wait until {0} (UTC time) to be able to login", user.LockoutEnd));
            //}

            if (!result.Succeeded)
            {
                //// User has input an invalid password
                //if (!user.UserName.Equals(SD.AdminUserName))
                //{
                //    // Increamenting AccessFailedCount of the AspNetUser by 1
                //    await _userManager.AccessFailedAsync(user);
                //}

                //if (user.AccessFailedCount >= SD.MaximumLoginAttempts)
                //{
                //    // Lock the user for one day
                //    await _userManager.SetLockoutEndDateAsync(user, DateTime.UtcNow.AddDays(1));
                //    return Unauthorized(string.Format("Your account has been locked. You should wait until {0} (UTC time) to be able to login", user.LockoutEnd));
                //}


                return Unauthorized(new { Message = "Invalid username or password" });
            }

            await userManager.ResetAccessFailedCountAsync(user);
            await userManager.SetLockoutEndDateAsync(user, null);

            var token = jwtService.CreateJWT(user);

            return new AuthResponse { JWT = await jwtService.CreateJWT(user), };
        }

        private async Task<IActionResult> RegisterUser<TUser, TRequest>(TRequest request, string role, int roleId)
             where TUser : Models.Korisnik, new()
             where TRequest : IUserRegistrationRequest
        {
            var user = mapper.Map<TUser>(request);
            user.PasswordSalt = HelperMethods.GenerateSalt();
            user.UlogaId = roleId;

            var result = await userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await userManager.AddToRoleAsync(user, role);

            try
            {
                if (await SendConfirmEMailAsync(user))
                {
                    return Ok(new JsonResult(new { title = "Account Created", message = "Your account has been created, please confirm your email address." }));
                }

                return BadRequest("Failed to send email. Please contact admin");
            }
            catch (Exception)
            {
                return BadRequest("Failed to send email. Please contact admin");
            }
        }

        private async Task<bool> SendConfirmEMailAsync(Korisnik user)
        {
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var url = $"{config["JwtSettings:Audience"]}/{config["Email:ConfirmEmailPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Hello</p>" +
                "<p>Please confirm your email address by clicking on the following link.</p>" +
                $"<p><a href=\"{url}\">Click here</a></p>" +
                "<p>Thank you,</p>" +
                $"<br>{config["Email:ApplicationName"]}";

            var emailSend = new EmailSend(user.Email, "Confirm your email", body);

            return await emailService.SendEmailAsync(emailSend);
        }
    }
}
