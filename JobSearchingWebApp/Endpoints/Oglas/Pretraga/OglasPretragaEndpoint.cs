using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.Pretraga
{
    [Tags("Oglas")]
    [Route("oglas-pretraga")]
    public class OglasPretragaEndpoint : MyBaseEndpoint<OglasPretragaRequest, OglasPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<OglasPretragaResponse> MyAction([FromQuery]OglasPretragaRequest request, CancellationToken cancellationToken)
        {
            var oglasi = await dbContext
                     .Oglasi
                     .Where(x => (request.naziv_pozicije == null || x.NazivPozicije.ToLower().StartsWith(request.naziv_pozicije.ToLower()))
                              && (request.lokacija == null || x.Lokacija.ToLower().StartsWith(request.lokacija.ToLower()))
                              && (request.plata == null || (x.Plata == request.plata))
                               && (request.tip_posla == null || x.TipPosla.ToLower().StartsWith(request.tip_posla.ToLower()))
                               && (request.iskustvo == null || x.Iskustvo.ToLower().StartsWith(request.iskustvo.ToLower()))
                               )
                     .Select(x => new OglasiPretragaResponse()
                     {
                         Id = x.Id,
                         KompanijaId = x.KompanijaId,   
                         NazivPozicije = x.NazivPozicije, 
                         Lokacija = x.Lokacija, 
                         DatumObjave = x.DatumObjave, 
                         Plata = x.Plata, 
                         TipPosla = x.TipPosla, 
                         RokPrijave = x.RokPrijave, 
                         Iskustvo = x.Iskustvo, 
                         OpisPosla = x.OpisPosla, 
                         DatumModificiranja = x.DatumModificiranja,
                     }).ToListAsync();

            return new OglasPretragaResponse { Oglasi = oglasi };
        }
    }
}
