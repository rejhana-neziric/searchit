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

namespace JobSearchingWebApp.Endpoints.Auth
{
    [Route("")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Models.Korisnik> userManager;
        private readonly SignInManager<Models.Korisnik> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;
        private readonly JWTService jwtService;

        public AuthController(UserManager<Models.Korisnik> userManager, SignInManager<Models.Korisnik> signInManager, IMapper mapper, IConfiguration configuration, JWTService jwtService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.configuration = configuration;
            this.jwtService = jwtService;
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

        [HttpGet("refresh-token")]
        [Authorize]
        public async Task<IActionResult> RefereshToken()
        {
            var token = Request.Cookies["identityAppRefreshToken"];
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Ok(userId);
        }


        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user == null) return Unauthorized(new { Message = "Invalid username or password" });

            //if (user.EmailConfirmed == false) return Unauthorized("Please confirm your email.");

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

            return new LoginResponse { JWT = await jwtService.CreateJWT(user), };
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

            return Ok(new { Result = $"{role} created successfully" });
        }
    }
}
