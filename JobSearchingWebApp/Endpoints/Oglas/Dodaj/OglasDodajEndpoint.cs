using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.Dodaj
{
    [Tags("Oglas")]
    [Route("oglas-dodaj")]
    public class OglasDodajEndpoint : MyBaseEndpoint<OglasDodajRequest, OglasDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OglasDodajResponse> MyAction(OglasDodajRequest request, CancellationToken cancellationToken)
        {
            var oglas = new Models.Oglas()
            {
                KompanijaId = request.kompanija_id, 
                NazivPozicije = request.naziv_pozicije,
                DatumObjave = request.datum_objave, 
                Plata = request.plata,
                TipPosla = request.tip_posla, 
                RokPrijave = request.rok_prijave,
                DatumModificiranja = request.datum_modificiranja
            }; 

            dbContext.Oglasi.Add(oglas);
            await dbContext.SaveChangesAsync(); 

            return new OglasDodajResponse { Id = oglas.Id };
        }
    }
}
