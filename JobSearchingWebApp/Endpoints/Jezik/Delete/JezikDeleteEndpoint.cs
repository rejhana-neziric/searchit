using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Jezik.Delete
{
    [Tags("Jezik")]
    [Route("jezik-delete")]
    public class JezikDeleteEndpoint : MyBaseEndpoint<JezikDeleteRequest, JezikDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public JezikDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<JezikDeleteResponse> MyAction([FromQuery] JezikDeleteRequest request, CancellationToken cancellationToken)
        {
            var jezik = dbContext.Jezici.FirstOrDefault(x => x.Id == request.jezik_id);

            if (jezik == null)
            {
                throw new Exception("Nije pronađen jezik sa ID " + request.jezik_id);
            }

            dbContext.Remove(jezik);
            await dbContext.SaveChangesAsync();

            return new JezikDeleteResponse() { };
        }
    }
}
