using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Vjestina.Delete
{
    [Tags("Vjestina")]
    [Route("vjestina-delete")]
    public class VjestinaDeleteEndpoint : MyBaseEndpoint<VjestinaDeleteRequest, VjestinaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public VjestinaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<VjestinaDeleteResponse> MyAction([FromQuery] VjestinaDeleteRequest request, CancellationToken cancellationToken)
        {
            var vjestina = dbContext.Vjestine.FirstOrDefault(x => x.Id == request.vjestina_id);

            if (vjestina == null)
            {
                throw new Exception("Nije pronađena vjetina sa ID " + request.vjestina_id);
            }

            dbContext.Remove(vjestina);
            await dbContext.SaveChangesAsync();

            return new VjestinaDeleteResponse() { };
        }
    }
}
