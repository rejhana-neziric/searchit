using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CVJezik.Delete
{
    [Route("cv-jezik-delete")]
    public class CVJezikDeleteEndpoint : MyBaseEndpoint<CVJezikDeleteRequest, CVJezikDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVJezikDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<CVJezikDeleteResponse> MyAction([FromQuery] CVJezikDeleteRequest request)
        {
            var cv_jezik = dbContext.CVJezici.FirstOrDefault(x => x.Id == request.cv_jezik_id);

            if (cv_jezik == null)
            {
                throw new Exception("Nije pronađen cv_jezik sa ID " + request.cv_jezik_id);
            }

            dbContext.Remove(cv_jezik);
            await dbContext.SaveChangesAsync();

            return new CVJezikDeleteResponse() { };
        }
    }
}
