using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Delete
{
    [Route("osoba-notifikacija-delete")]
    public class OsobaNotifikacijaDeleteEndpoint : MyBaseEndpoint<OsobaNotifikacijaDeleteRequest, OsobaNotifikacijaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OsobaNotifikacijaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<OsobaNotifikacijaDeleteResponse> MyAction([FromQuery]OsobaNotifikacijaDeleteRequest request)
        {
            var osoba_notifikacija = dbContext.OsobaNotifikacije.FirstOrDefault(x => x.Id == request.osoba_notifikacija_id);

            if (osoba_notifikacija == null)
            {
                throw new Exception("Nije pronađen osoba_notifikacija sa ID " + request.osoba_notifikacija_id);
            }

            dbContext.Remove(osoba_notifikacija);
            await dbContext.SaveChangesAsync();

            return new OsobaNotifikacijaDeleteResponse() { };
        }
    }
}
