using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga
{
    [Route("kandidat-oglas-pretraga")]
    public class KandidatOglasPretragaEndpoint : MyBaseEndpoint<KandidatOglasPretragaRequest, KandidatOglasPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatOglasPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<KandidatOglasPretragaResponse> MyAction([FromQuery]KandidatOglasPretragaRequest request)
        {
            var kandidati_oglasi = await dbContext
                                 .KandidatiOglasi
                                 .Where(x => (request.kandidat_id == null || x.KandidatId == request.kandidat_id)
                                          && (request.oglas_id == null || x.OglasId == request.oglas_id)
                                          && (request.datum_prijave == null || x.DatumPrijave == request.datum_prijave)
                                          && (request.status == null || x.Status.ToLower().StartsWith(request.status.ToLower())))
                                 .Select(x => new KandidatiOglasiPretragaResponse()
                                 {
                                    KandidatId = x.KandidatId,  
                                    OglasId = x.OglasId,    
                                    DatumPrijave = x.DatumPrijave,  
                                    Status = x.Status,  
                                 }).ToListAsync();

            return new KandidatOglasPretragaResponse { KandidatiOglasi = kandidati_oglasi };
        }
    }
}
