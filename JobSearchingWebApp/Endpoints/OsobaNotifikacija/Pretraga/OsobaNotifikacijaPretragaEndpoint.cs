using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Pretraga
{
    [Route("osoba-notifikacija-pretraga")]
    public class OsobaNotifikacijaPretragaEndpoint : MyBaseEndpoint<OsobaNotifikacijaPretragaRequest, OsobaNotifikacijaPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OsobaNotifikacijaPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<OsobaNotifikacijaPretragaResponse> MyAction([FromQuery]OsobaNotifikacijaPretragaRequest request)
        {
            var osobe_notifikacije = await dbContext
                                 .OsobaNotifikacije
                                 .Where(x => (request.osoba_id == null || x.OsobaId == request.osoba_id)
                                          && (request.notifikacija_id == null || x.NotifikacijaId == request.notifikacija_id)
                                          && (request.datum_primanja == null || x.DatumPrimanja == request.datum_primanja)
                                          && (request.pogledano == null || x.Pogledano == request.pogledano))
                                 .Select(x => new OsobeNotifikacijePretragaResponse()
                                 {
                                     OsobaId = x.OsobaId, 
                                     NotifikacijaId = x.NotifikacijaId,
                                     DatumPrimanja = x.DatumPrimanja,
                                     Pogledano = x.Pogledano
                                 }).ToListAsync();

            return new OsobaNotifikacijaPretragaResponse { OsobeNotifikacije = osobe_notifikacije };
        }
    }
}
