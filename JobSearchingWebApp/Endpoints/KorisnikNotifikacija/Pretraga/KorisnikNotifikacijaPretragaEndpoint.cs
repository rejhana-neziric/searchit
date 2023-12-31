using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Pretraga
{
    [Tags("Korisnik-Notifikacija")]
    [Route("korisnik-notifikacija-pretraga")]
    public class KorisnikNotifikacijaPretragaEndpoint : MyBaseEndpoint<KorisnikNotifikacijaPretragaRequest, KorisnikNotifikacijaPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KorisnikNotifikacijaPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<KorisnikNotifikacijaPretragaResponse> MyAction([FromQuery] KorisnikNotifikacijaPretragaRequest request, CancellationToken cancellationToken)
        {
            var korisnici_notifikacije = await dbContext
                                 .KorisnikNotifikacije
                                 .Where(x => (request.korisnik_id == null || x.KorisnikId == request.korisnik_id)
                                          && (request.notifikacija_id == null || x.NotifikacijaId == request.notifikacija_id)
                                          && (request.datum_primanja == null || x.DatumPrimanja == request.datum_primanja)
                                          && (request.pogledano == null || x.Pogledano == request.pogledano))
                                 .Select(x => new KorisniciNotifikacijePretragaResponse()
                                 {
                                     KorisnikId = x.KorisnikId,
                                     NotifikacijaId = x.NotifikacijaId,
                                     DatumPrimanja = x.DatumPrimanja,
                                     Pogledano = x.Pogledano
                                 }).ToListAsync();

            return new KorisnikNotifikacijaPretragaResponse { KorisniciNotifikacije = korisnici_notifikacije };
        }
    }
}
