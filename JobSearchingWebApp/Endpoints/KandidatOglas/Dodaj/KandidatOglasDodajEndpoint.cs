using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Dodaj
{
    [Tags("Kandidat-Oglas")]
    [Route("kandidat-oglas-dodaj")]
    public class KandidatOglasDodajEndpoint : MyBaseEndpoint<KandidatOglasDodajRequest, KandidatOglasDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatOglasDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatOglasDodajResponse> MyAction(KandidatOglasDodajRequest request, CancellationToken cancellationToken)
        {
            var kandidat_oglas = new Models.KandidatiOglasi()
            {
                KandidatId = request.KandidatId, 
                OglasId = request.OglasId,  
                CVId = request.CVId,
                DatumPrijave = request.DatumPrijave,
                Status = request.Status,    
            };

            dbContext.KandidatiOglasi.Add(kandidat_oglas);
            await dbContext.SaveChangesAsync();

            return new KandidatOglasDodajResponse { Id = kandidat_oglas.Id };
        }
    }
}
