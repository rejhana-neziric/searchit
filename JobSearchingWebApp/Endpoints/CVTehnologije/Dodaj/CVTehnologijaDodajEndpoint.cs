using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CVTehnologije.Dodaj
{
    [Tags("CV-Tehnologija")]
    [Route("cv-tehnologija-dodaj")]
    public class CVTehnologijaDodajEndpoint : MyBaseEndpoint<CVTehnologijaDodajRequest, CVTehnologijaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVTehnologijaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<CVTehnologijaDodajResponse> MyAction(CVTehnologijaDodajRequest request, CancellationToken cancellationToken)
        {
            var cv_tehnologija = new Models.CVTehnologije()
            {
                CVId = request.cv_id,
                TehnologijaId = request.tehnologija_id,
            };

            dbContext.CVTehnologije.Add(cv_tehnologija);
            await dbContext.SaveChangesAsync();

            return new CVTehnologijaDodajResponse { Id = cv_tehnologija.Id };
        }
    }
}
