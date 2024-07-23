using IdentityServer3.Core.Services;
using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Korisnik;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace JobSearchingWebApp.Endpoints.AutentifikacijaJWT.Registracija
{
    [Tags("Registacija")]
    [Route("registracija")]
    public class RegistracijaEndpoint : MyBaseEndpoint<RegistracijaRequest, IActionResult>
    {
        //can be deleted

        private readonly ApplicationDbContext dbContext;

        public RegistracijaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("register")]
        public override async Task<IActionResult> MyAction([FromBody] RegistracijaRequest request, CancellationToken cancellationToken)
        {
            var salt = HelperMethods.GenerateSalt();

            var korisnik = new Models.Korisnik
            {
                Email = request.Email,
                //Password = HelperMethods.GenerateHash(salt, request.Password),
               /// Salt = salt,
                UlogaId = request.UlogaId
            };

            await dbContext.Korisnici.AddAsync(korisnik);
           // var token = _tokenService.CreateToken(user);

            return Ok(new AuthResponse { Token = "token" });
        }
    }
}
