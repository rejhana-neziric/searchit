using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace JobSearchingWebApp.Helper.Services
{
    public class MyAuthService
    {
        private readonly ApplicationDbContext applicationDbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public MyAuthService(ApplicationDbContext applicationDbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.applicationDbContext = applicationDbContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        public bool JelLogiran()
        {
            return GetAuthInfo().isLogiran;
        }

        public MyAuthInfo GetAuthInfo()
        {
            string? authToken = httpContextAccessor.HttpContext!.Request.Headers["my-auth-token"];

            AutentifikacijaToken? autentifikacijaToken = applicationDbContext.AutentifikacijaToken
                .Include(x => x.Korisnik)
                .SingleOrDefault(x => x.Vrijednost == authToken);

            return new MyAuthInfo(autentifikacijaToken);
        }
    }

    public class MyAuthInfo
    {
        public MyAuthInfo(AutentifikacijaToken? autentifikacijaToken)
        {
            this.autentifikacijaToken = autentifikacijaToken;
        }

        [JsonIgnore]
        public Korisnik? korisnik => autentifikacijaToken?.Korisnik;
        public AutentifikacijaToken? autentifikacijaToken { get; set; }

        public bool isLogiran => korisnik != null;
    }
}
