using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Tehnologija.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Jezik.Pretraga
{
    [Tags("Tehnologija")]
    [Route("tehnologija-pretraga")]
    public class TehnologijaPretragaEndpoint : MyBaseEndpoint<TehnologijaPretragaRequest, TehnologijaPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public TehnologijaPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<TehnologijaPretragaResponse> MyAction([FromQuery] TehnologijaPretragaRequest request, CancellationToken cancellationToken)
        {
            var tehnologije = await dbContext
                                 .Tehnologije
                                 .Where(x => request.naziv == null || x.Naziv.ToLower().StartsWith(request.naziv.ToLower()))
                                 .Select(x => new TehnologijePretragaResponse()
                                 {
                                    Naziv = x.Naziv,    
                                 }).ToListAsync();

            return new TehnologijaPretragaResponse { Tehnologije = tehnologije };
        }
    }
}
