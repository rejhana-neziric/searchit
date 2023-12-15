using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Vjestina.Dodaj
{
    [Route("vjestina-dodaj")]
    public class VjestinaDodajEndpoint : MyBaseEndpoint<VjestinaDodajRequest, VjestinaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public VjestinaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<VjestinaDodajResponse> MyAction(VjestinaDodajRequest request)
        {
            var vjestina = new Models.Vjestina
            {
                Naziv = request.naziv
            };

            dbContext.Vjestine.Add(vjestina);
            await dbContext.SaveChangesAsync();

            return new VjestinaDodajResponse { Id = vjestina.Id };
        }
    }
}
