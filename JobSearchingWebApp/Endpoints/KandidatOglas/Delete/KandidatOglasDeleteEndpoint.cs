using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Delete
{
    [Tags("Kandidat-Oglas")]
    [Route("kandidat-oglas-delete")]
    public class KandidatOglasDeleteEndpoint : MyBaseEndpoint<KandidatOglasDeleteRequest, KandidatOglasDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatOglasDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<KandidatOglasDeleteResponse> MyAction([FromQuery]KandidatOglasDeleteRequest request, CancellationToken cancellationToken)
        {
            var kandidat_oglas = dbContext.KandidatiOglasi.FirstOrDefault(x => x.Id == request.kandidat_oglas_id);

            if (kandidat_oglas == null)
            {
                throw new Exception("Nije pronađen kandidat_oglas sa ID " + request.kandidat_oglas_id);
            }

            dbContext.Remove(kandidat_oglas);
            await dbContext.SaveChangesAsync();

            return new KandidatOglasDeleteResponse() { };
        }
    }
}
