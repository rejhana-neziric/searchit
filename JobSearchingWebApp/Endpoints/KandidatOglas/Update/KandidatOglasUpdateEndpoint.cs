using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Update;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Update
{
    [Tags("Kandidat-Oglas")]
    [Route("kandidat-oglas-update")]
    public class KandidatOglasUpdateEndpoint : MyBaseEndpoint<KandidatOglasUpdateRequest, KandidatOglasUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatOglasUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatOglasUpdateResponse> MyAction(KandidatOglasUpdateRequest request, CancellationToken cancellationToken)
        {
            var kandidat_oglas = dbContext.KandidatiOglasi.FirstOrDefault(x => x.Id == request.kandidat_oglas_id);

            if (kandidat_oglas == null)
            {
                throw new Exception("Nije pronađen kandidat_oglas sa ID " + request.kandidat_oglas_id);
            }

            kandidat_oglas.Status = request.status;

            await dbContext.SaveChangesAsync();

            return new KandidatOglasUpdateResponse { Id = kandidat_oglas.Id };
        }
    }
}
