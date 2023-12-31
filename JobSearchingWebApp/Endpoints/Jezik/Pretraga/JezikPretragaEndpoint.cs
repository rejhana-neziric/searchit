using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Jezik.Pretraga
{
    [Tags("Jezik")]
    [Route("jezik-pretraga")]
    public class JezikPretragaEndpoint : MyBaseEndpoint<JezikPretragaRequest, JezikPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public JezikPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<JezikPretragaResponse> MyAction([FromQuery] JezikPretragaRequest request, CancellationToken cancellationToken)
        {
            var jezici = await dbContext
                                 .Jezici
                                 .Where(x => request.naziv == null || x.Naziv.ToLower().StartsWith(request.naziv.ToLower()))
                                 .Select(x => new JeziciPretragaResponse()
                                 {
                                    Naziv = x.Naziv,    
                                 }).ToListAsync();

            return new JezikPretragaResponse { Jezici = jezici };
        }
    }
}
