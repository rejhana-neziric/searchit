using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Dodaj
{
    [Tags("Korisnik-Notifikacija")]
    [Route("korisnik-notifikacija-dodaj")]
    public class KorisnikNotifikacijaDodajEndpoint : MyBaseEndpoint<KorisnikNotifikacijaDodajRequest, KorisnikNotifikacijaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KorisnikNotifikacijaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KorisnikNotifikacijaDodajResponse> MyAction(KorisnikNotifikacijaDodajRequest request, CancellationToken cancellationToken)
        {
            var korisnik_notifikacija = new Models.KorisnikNotifikacije()
            {
                KorisnikId = request.korisnik_id,
                NotifikacijaId = request.notifikacija_id,
                DatumPrimanja = request.datum_primanja,
                Pogledano = request.pogledano
            };

            dbContext.KorisnikNotifikacije.Add(korisnik_notifikacija);
            await dbContext.SaveChangesAsync();

            return new KorisnikNotifikacijaDodajResponse { Id = korisnik_notifikacija.Id };
        }
    }
}
