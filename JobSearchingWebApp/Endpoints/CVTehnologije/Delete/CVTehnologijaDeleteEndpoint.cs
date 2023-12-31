using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.CVTehnologije.Dodaj;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CVJezik.Delete
{
    [Tags("CV-Tehnologija")]
    [Route("cv-tehnologija-delete")]
    public class CVTehnologijaDeleteEndpoint : MyBaseEndpoint<CVJezikDeleteRequest, CVJezikDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVTehnologijaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<CVJezikDeleteResponse> MyAction([FromQuery] CVJezikDeleteRequest request, CancellationToken cancellationToken)
        {
            var cv_tehnologija = dbContext.CVTehnologije.FirstOrDefault(x => x.Id == request.cv_jezik_id);

            if (cv_tehnologija == null)
            {
                throw new Exception("Nije pronađen cv_jezik_id sa ID " + request.cv_jezik_id);
            }

            dbContext.Remove(cv_tehnologija);
            await dbContext.SaveChangesAsync();

            return new CVJezikDeleteResponse() { };
        }
    }
}
