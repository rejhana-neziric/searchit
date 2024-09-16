using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kandidat.Pretraga
{
    [Tags("Kandidat")]
    [Route("kandidat-pretraga")]
    public class KandidatPretragaEndpoint : MyBaseEndpoint<KandidatPretragaRequest, KandidatPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<KandidatPretragaResponse> MyAction([FromQuery]KandidatPretragaRequest request, CancellationToken cancellationToken)
        {
            var kandidati = await dbContext
                                 .Kandidati
                                 .Where(x => (request.ime == null || x.Ime.ToLower().StartsWith(request.ime.ToLower())) 
                                          && (request.prezime == null || x.Prezime.ToLower().StartsWith(request.prezime.ToLower()))
                                          && (request.username == null || x.UserName.ToLower().StartsWith(request.username.ToLower())))
                                 .Select(x => new KandidatiPretragaResponse()
                                 {
                                     Id = x.Id,   
                                     Email = x.Email,
                                     Username = x.UserName,   
                                     Ime = x.Ime,
                                     Prezime = x.Prezime,    
                                     DatumRodjenja = x.DatumRodjenja, 
                                     MjestoPrebivalista = x.MjestoPrebivalista,
                                    // Zvanje = x.Zvanje
                                 }).ToListAsync();    

            return new KandidatPretragaResponse { Kandidati = kandidati };   
        }
    }
}
