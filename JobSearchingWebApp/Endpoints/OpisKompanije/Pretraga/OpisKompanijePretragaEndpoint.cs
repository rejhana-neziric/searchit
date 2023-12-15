using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Pretraga
{
    [Route("opis-kompanije-pretraga")]
    public class OpisKompanijePretragaEndpoint : MyBaseEndpoint<OpisKompanijePretragaRequest, OpisKompanijePretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OpisKompanijePretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<OpisKompanijePretragaResponse> MyAction([FromQuery] OpisKompanijePretragaRequest request)
        {
            var kandidati = await dbContext
                                 .Kandidati
                                 //.Where(x => (request.ime == null || x.Ime.ToLower().StartsWith(request.ime.ToLower()))
                                 //         && (request.prezime == null || x.Prezime.ToLower().StartsWith(request.prezime.ToLower()))
                                 //         && (request.username == null || x.Username.ToLower().StartsWith(request.username.ToLower())))
                                 .Select(x => new OpisiKompanijaPretragaResponse()
                                 {
                                    
                                 }).ToListAsync();

            return new OpisKompanijePretragaResponse { OpisiKompanija = kandidati };
        }
    }
}
