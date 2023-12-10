using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kandidat.Delete
{
    [Route("kandidat-delete")]
    public class KandidatDeleteEndpoint : MyBaseEndpoint<KandidatDeleteRequest, KandidatDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<KandidatDeleteResponse> MyAction([FromQuery]KandidatDeleteRequest request)
        {
            var kandidat = dbContext.Kandidati.FirstOrDefault(x => x.Id == request.kandidat_id);

            if (kandidat == null)
            {
                throw new Exception("Nije pronađen kandidat sa ID " + request.kandidat_id);
            }

            dbContext.Remove(kandidat);
            await dbContext.SaveChangesAsync();

            return new KandidatDeleteResponse() { };
        }
    }
}
