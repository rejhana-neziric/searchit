using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Vjestina.Pretraga
{
    [Route("vjestina-pretraga")]
    public class VjestinaPretragaEndpoint : MyBaseEndpoint<VjestinaPretragaRequest, VjestinaPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public VjestinaPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<VjestinaPretragaResponse> MyAction([FromQuery] VjestinaPretragaRequest request)
        {
            var vjestine = await dbContext
                                 .Vjestine
                                 .Where(x => request.naziv == null || x.Naziv.ToLower().StartsWith(request.naziv.ToLower()))
                                 .Select(x => new VjestinePretragaResponse()
                                 {
                                     Naziv = x.Naziv,
                                 }).ToListAsync();

            return new VjestinaPretragaResponse { Vjestine = vjestine };
        }
    }
}
