using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Autentifikacija.Login
{
    [Tags("Autentifikacija")]
    [Route("auth-login")]
    public class AutentifikacijaLoginEndpoint : MyBaseEndpoint<AutentifikacijaLoginRequest, MyAuthInfo>
    {
        private readonly ApplicationDbContext applicationDbContext;

        public AutentifikacijaLoginEndpoint(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        [HttpPost()]
        public override async Task<MyAuthInfo> MyAction([FromBody] AutentifikacijaLoginRequest request, CancellationToken cancellationToken)
        {
            //1- provjera logina
            Korisnik? logiraniKorisnik = await applicationDbContext.Korisnici.FirstOrDefaultAsync(x => x.Username == request.Username 
                                                                                                    && x.Password == request.Password, cancellationToken);

            if (logiraniKorisnik == null)
            {
                //pogresan username i password
                return new MyAuthInfo(null);
            }

            //2- generisati random string
            string randomString = TokenGenerator.Generisi(10);

            //3- dodati novi zapis u tabelu AutentifikacijaToken za logiraniKorisnikId i randomString
            var noviToken = new AutentifikacijaToken()
            {
                IPAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
                Vrijednost = randomString,
                Korisnik = logiraniKorisnik,
                VrijemeEvidentiranja = DateTime.Now
            };

            applicationDbContext.Add(noviToken);
            await applicationDbContext.SaveChangesAsync(cancellationToken);

            //4- vratiti token string
            return new MyAuthInfo(noviToken);
        }
    }
}
