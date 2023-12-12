using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CV.Delete
{
    [Route("cv-delete")]
    public class CVDeleteEndpoint : MyBaseEndpoint<CVDeleteRequest, CVDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<CVDeleteResponse> MyAction([FromQuery]CVDeleteRequest request)
        {
            var cv = dbContext.CV.FirstOrDefault(x => x.Id == request.cv_id);

            if (cv == null)
            {
                throw new Exception("Nije pronađen CV sa ID " + request.cv_id);
            }

            dbContext.Remove(cv);
            await dbContext.SaveChangesAsync();

            return new CVDeleteResponse() { };
        }
    }
}
