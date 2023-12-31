using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Tehnologija.Delete
{
    [Tags("Tehnologija")]
    [Route("tehnologija-delete")]
    public class TehnologijaDeleteEndpoint : MyBaseEndpoint<TehnologijaDeleteRequest, TehnologijaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public TehnologijaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<TehnologijaDeleteResponse> MyAction([FromQuery] TehnologijaDeleteRequest request, CancellationToken cancellationToken)
        {
            var tehnologija = dbContext.Tehnologije.FirstOrDefault(x => x.Id == request.tehnologija_id);

            if (tehnologija == null)
            {
                throw new Exception("Nije pronađena tehnologija sa ID " + request.tehnologija_id);
            }

            dbContext.Remove(tehnologija);
            await dbContext.SaveChangesAsync();

            return new TehnologijaDeleteResponse() { };
        }
    }
}
