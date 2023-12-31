using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JobSearchingWebApp.Endpoints.Jezik.Dodaj
{
    [Tags("Jezik")]
    [Route("jezik-dodaj")]
    public class JezikDodajEndpoint : MyBaseEndpoint<JezikDodajRequest, JezikDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public JezikDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<JezikDodajResponse> MyAction(JezikDodajRequest request, CancellationToken cancellationToken)
        {
            var jezik = new Models.Jezik
            {
                Naziv = request.naziv
            };

            dbContext.Jezici.Add(jezik);
            await dbContext.SaveChangesAsync();

            return new JezikDodajResponse { Id = jezik.Id };
        }
    }
}
