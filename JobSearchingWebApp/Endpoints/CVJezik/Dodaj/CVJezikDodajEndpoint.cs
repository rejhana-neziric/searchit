using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CVJezik.Dodaj
{
    [Tags("CV-Jezik")]
    [Route("cv-jezik-dodaj")]
    public class CVJezikDodajEndpoint : MyBaseEndpoint<CVJezikDodajRequest, CVJezikDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVJezikDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]

        public override async Task<CVJezikDodajResponse> MyAction(CVJezikDodajRequest request, CancellationToken cancellationToken)
        {
            var cv_jezik = new Models.CVJezici()
            {
                CVId = request.cv_id,
                JezikId = request.jezik_id,
            };

            dbContext.CVJezici.Add(cv_jezik);
            await dbContext.SaveChangesAsync();

            return new CVJezikDodajResponse { Id = cv_jezik.Id };
        }
    }
}
