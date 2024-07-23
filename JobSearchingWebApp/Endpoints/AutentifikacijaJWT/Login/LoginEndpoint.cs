using IdentityServer3.Core.Services;
using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.AutentifikacijaJWT.Registracija;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.AutentifikacijaJWT.Login
{
    [Tags("Login")]
    [Route("login")]
    public class LoginEndpoint : MyBaseEndpoint<LoginRequest, IActionResult>
    {
        //can be deleted

        private readonly IAuthService _authService;
        private readonly ApplicationDbContext dbContext;


        public LoginEndpoint(IAuthService authService, ApplicationDbContext dbContext)
        {
            _authService = authService;
            this.dbContext = dbContext;
        }

        [HttpPost("login")]
        public override async Task<IActionResult> MyAction([FromBody] LoginRequest request, CancellationToken cancellationToken)
        {
            Models.Korisnik? korisnik = await dbContext.Korisnici.FindAsync(request.Username);

            if (korisnik == null)
            {
                return Unauthorized("Invalid credentials 1");
            }

            //var saltedPassword = request.Password + user.Salt;

            //var result = VerifyHashedPassword(user, user.Password, saltedPassword);

            //var result = HelperMethods.GenerateHash(korisnik.Salt, request.Password); 

            //if (result != korisnik.PasswordHash)
            //{
            //    return Unauthorized("Invalid credentials 2");
            //}

            //// Generate token
            //var token = _tokenService.CreateToken(user);

            // Return the token
            return Ok(new AuthResponse { Token = "" });
        }
    }
}
