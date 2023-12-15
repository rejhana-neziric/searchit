using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Tehnologija.Dodaj
{
    [Route("tehnologija-dodaj")]
    public class TehnologijaDodajEndpoint : MyBaseEndpoint<TehnologijaDodajRequest, TehnologijaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public TehnologijaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<TehnologijaDodajResponse> MyAction(TehnologijaDodajRequest request)
        {
            var tehnologija = new Models.Tehnologija
            {
                Naziv = request.naziv
            };

            dbContext.Tehnologije.Add(tehnologija);
            await dbContext.SaveChangesAsync();

            return new TehnologijaDodajResponse { Id = tehnologija.Id };
        }
    }
}
