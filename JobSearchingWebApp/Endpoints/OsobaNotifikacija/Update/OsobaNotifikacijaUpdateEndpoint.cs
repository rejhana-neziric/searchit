using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Update;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Update
{
    [Route("osoba-notifikacija-update")]
    public class OsobaNotifikacijaUpdateEndpoint : MyBaseEndpoint<OsobaNotifikacijaUpdateRequest, OsobaNotifikacijaUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OsobaNotifikacijaUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OsobaNotifikacijaUpdateResponse> MyAction(OsobaNotifikacijaUpdateRequest request)
        {
            var osoba_notifikacija = dbContext.OsobaNotifikacije.FirstOrDefault(x => x.Id == request.osoba_notifikacija_id);

            if (osoba_notifikacija == null)
            {
                throw new Exception("Nije pronađen osoba_notifikacija sa ID " + request.osoba_notifikacija_id);
            }

            osoba_notifikacija.Pogledano = request.pogledano;

            await dbContext.SaveChangesAsync();

            return new OsobaNotifikacijaUpdateResponse { Id = osoba_notifikacija.Id };
        }
    }
}
