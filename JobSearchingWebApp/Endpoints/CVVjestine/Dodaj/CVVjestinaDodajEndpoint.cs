using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CVVjestine.Dodaj
{
    [Tags("CV-Vjestina")]
    [Route("cv-vjestina-dodaj")]
    public class CVVjestinaDodajEndpoint : MyBaseEndpoint<CVVjestinaDodajRequest, CVVjestinaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVVjestinaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<CVVjestinaDodajResponse> MyAction(CVVjestinaDodajRequest request, CancellationToken cancellationToken)
        {
            var cv_vjestina = new Database.CVVjestine()
            {
                CVId = request.cv_id,
                VjestinaId = request.vjestina_id,
            };

            dbContext.CVVjestine.Add(cv_vjestina);
            await dbContext.SaveChangesAsync();

            return new CVVjestinaDodajResponse { Id = cv_vjestina.Id };
        }
    }
}
