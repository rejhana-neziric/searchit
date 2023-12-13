using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Dodaj
{
    [Route("kandidat-oglas-dodaj")]
    public class KandidatOglasDodajEndpoint : MyBaseEndpoint<KandidatOglasDodajRequest, KandidatOglasDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatOglasDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatOglasDodajResponse> MyAction(KandidatOglasDodajRequest request)
        {
            var kandidat_oglas = new Models.KandidatiOglasi()
            {
                KandidatId = request.kandidat_id, 
                OglasId = request.oglas_id,  
                DatumPrijave = request.datum_prijave,
                Status = request.status,    
            };

            dbContext.KandidatiOglasi.Add(kandidat_oglas);
            await dbContext.SaveChangesAsync();

            return new KandidatOglasDodajResponse { Id = kandidat_oglas.Id };
        }
    }
}
