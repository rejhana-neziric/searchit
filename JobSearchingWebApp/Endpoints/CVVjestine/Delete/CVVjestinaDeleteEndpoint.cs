using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CVVjestine.Delete
{
    [Tags("CV-Vjestina")]
    [Route("cv-vjestina-delete")]
    public class CVVjestinaDeleteEndpoint : MyBaseEndpoint<CVVjestinaDeleteRequest, CVVjestinaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVVjestinaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<CVVjestinaDeleteResponse> MyAction([FromQuery] CVVjestinaDeleteRequest request, CancellationToken cancellationToken)
        {
            var cv_vjestina = dbContext.CVVjestine.FirstOrDefault(x => x.Id == request.cv_vjestina_id);

            if (cv_vjestina == null)
            {
                throw new Exception("Nije pronađen cv_vjestina sa ID " + request.cv_vjestina_id);
            }

            dbContext.Remove(cv_vjestina);
            await dbContext.SaveChangesAsync();

            return new CVVjestinaDeleteResponse() { };
        }
    }
}
