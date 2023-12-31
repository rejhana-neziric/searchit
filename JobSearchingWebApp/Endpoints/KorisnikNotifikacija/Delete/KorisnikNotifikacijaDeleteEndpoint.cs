using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Delete
{
    [Tags("Korisnik-Notifikacija")]
    [Route("korisnik-notifikacija-delete")]
    public class KorisnikNotifikacijaDeleteEndpoint : MyBaseEndpoint<KorisnikNotifikacijaDeleteRequest, KorisnikNotifikacijaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KorisnikNotifikacijaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<KorisnikNotifikacijaDeleteResponse> MyAction([FromQuery] KorisnikNotifikacijaDeleteRequest request, CancellationToken cancellationToken)
        {
            var korisnik_notifikacija = dbContext.KorisnikNotifikacije.FirstOrDefault(x => x.Id == request.korisnik_notifikacija_id);

            if (korisnik_notifikacija == null)
            {
                throw new Exception("Nije pronađen korisnik_notifikacija sa ID " + request.korisnik_notifikacija_id);
            }

            dbContext.Remove(korisnik_notifikacija);
            await dbContext.SaveChangesAsync();

            return new KorisnikNotifikacijaDeleteResponse() { };
        }
    }
}
