using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Notifikacija.Pretraga
{
    [Route("notifikacija-pretraga")]
    public class NotifikacijaPretragaEndpoint : MyBaseEndpoint<NotifikacijaPretragaRequest, NotifikacijaPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public NotifikacijaPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<NotifikacijaPretragaResponse> MyAction([FromQuery]NotifikacijaPretragaRequest request)
        {
            var notifikacije = await dbContext
                    .Notifikacije
                    .Where(x => (request.naziv == null || x.Naziv.ToLower().StartsWith(request.naziv.ToLower()))
                             && (request.vrsta == null || x.Vrsta.ToLower().StartsWith(request.vrsta.ToLower())))
                    .Select(x => new NotifikacijePretragaResponse()
                    {
                        Id = x.Id, 
                        Naziv = x.Naziv,
                        Vrsta = x.Vrsta,
                    }).ToListAsync();

            return new NotifikacijaPretragaResponse { Notifikacije = notifikacije };
        }
    }
}
