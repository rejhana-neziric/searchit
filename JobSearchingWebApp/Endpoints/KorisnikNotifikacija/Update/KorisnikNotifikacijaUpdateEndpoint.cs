using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Update
{
    [Tags("Korisnik-Notifikacija")]
    [Route("korisnik-notifikacija-update")]
    public class KorisnikNotifikacijaUpdateEndpoint : MyBaseEndpoint<KorisnikNotifikacijaUpdateRequest, KorisnikNotifikacijaUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KorisnikNotifikacijaUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KorisnikNotifikacijaUpdateResponse> MyAction(KorisnikNotifikacijaUpdateRequest request, CancellationToken cancellationToken)
        {
            var korisnik_notifikacija = dbContext.KorisnikNotifikacije.FirstOrDefault(x => x.Id == request.korisnik_notifikacija_id);

            if (korisnik_notifikacija == null)
            {
                throw new Exception("Nije pronađen korisnik_notifikacija sa ID " + request.korisnik_notifikacija_id);
            }

            korisnik_notifikacija.Pogledano = request.pogledano;

            await dbContext.SaveChangesAsync();

            return new KorisnikNotifikacijaUpdateResponse { Id = korisnik_notifikacija.Id };
        }
    }
}
