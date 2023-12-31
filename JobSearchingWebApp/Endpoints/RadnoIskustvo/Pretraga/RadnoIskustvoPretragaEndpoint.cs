using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Pretraga
{
    [Tags("RadnoIskustvo")]
    [Route("radno-iskustvo-pretraga")]
    public class RadnoIskustvoPretragaEndpoint : MyBaseEndpoint<RadnoIskustvoPretragaRequest, RadnoIskustvoPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public RadnoIskustvoPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<RadnoIskustvoPretragaResponse> MyAction([FromQuery]RadnoIskustvoPretragaRequest request, CancellationToken cancellationToken)
        {
            var radna_iskustva = await dbContext
                                 .RadnoIskustvo
                                 .Where(x => (request.naziv_pozicije == null || x.NazivPozicija.ToLower().StartsWith(request.naziv_pozicije.ToLower()))
                                          && (request.naziv_kompanije == null || x.NazivKompanije.ToLower().StartsWith(request.naziv_kompanije.ToLower()))
                                          && (request.cv_id == null || request.cv_id == x.CVId))
                                 .Select(x => new RadnaIskustvaPretragaResponse()
                                 {
                                     NazivPozicija = x.NazivPozicija,
                                     DatumPocetka = x.DatumPocetka, 
                                     DatumZavrsetka = x.DatumZavrsetka, 
                                     NazivKompanije = x.NazivKompanije,
                                     Opis = x.Opis,
                                     CVId = x.CVId,
                                 }).ToListAsync();

            return new RadnoIskustvoPretragaResponse { RadnaIskustva = radna_iskustva };
        }
    }
}
