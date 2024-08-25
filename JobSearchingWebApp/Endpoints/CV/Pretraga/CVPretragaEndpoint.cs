using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CV.Pretraga
{
    [Tags("CV")]
    [Route("cv-pretraga")]
    public class CVPretragaEndpoint : MyBaseEndpoint<CVPretragaRequest, CVPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<CVPretragaResponse> MyAction([FromQuery]CVPretragaRequest request, CancellationToken cancellationToken)
        {
            var cv = await dbContext
                      .CV
                      .Where(x => (request.ime == null || x.Ime.ToLower().StartsWith(request.ime.ToLower()))
                               && (request.prezime == null || x.Prezime.ToLower().StartsWith(request.prezime.ToLower()))
                                && (request.email == null || x.Email.ToLower().StartsWith(request.email.ToLower())))
                      .Select(x => new CVLista()
                      {
                          Ime = x.Ime, 
                          Prezime = x.Prezime,
                          Email = x.Email,
                          BrojTelefona = x.BrojTelefona,
                          //OpisProfila = x.OpisProfila,  
                          //Slika = x.Slika,  
                      }).ToListAsync();

            return new CVPretragaResponse { CVLista = cv };
        }
    }
}
