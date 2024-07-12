using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatSpaseniOglasi.Dodaj;
using JobSearchingWebApp.Endpoints.Oglas.Update;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatSpaseniOglasi.Update
{
    [Tags("Kandidat-Spaseni-Oglas")]
    [Route("kandidat-spaseni-oglas-update")]
    public class KandidatSpaseniOglasiUpdateEndpoint : MyBaseEndpoint<KandidatSpaseniOglasiUpdateRequest, KandidatSpaseniOglasiUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatSpaseniOglasiUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPut]
        public override async Task<KandidatSpaseniOglasiUpdateResponse> MyAction(KandidatSpaseniOglasiUpdateRequest request, CancellationToken cancellationToken)
        {
            var spaseni = dbContext.KandidatSpaseniOglasi.Where(spaseni => spaseni.KandidatId == request.kandidat_id && spaseni.OglasId == request.oglas_id).FirstOrDefault();

            if (spaseni == null)
            {
                throw new Exception("Nije pronađen oglas sa ID " + request.oglas_id);
            }

            spaseni.Spasen = false; 

            await dbContext.SaveChangesAsync();

            return new KandidatSpaseniOglasiUpdateResponse { id = spaseni.Id };
        }
    }
}
