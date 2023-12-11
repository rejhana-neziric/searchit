using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kompanija.Delete
{
    [Route("kompanija-delete")]
    public class KompanijaDeleteEndpoint : MyBaseEndpoint<KompanijaDeleteRequest, KompanijaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<KompanijaDeleteResponse> MyAction([FromQuery]KompanijaDeleteRequest request)
        {
            var kompanija = dbContext.Kompanije.FirstOrDefault(x => x.Id == request.kompanija_id);

            if (kompanija == null)
            {
                throw new Exception("Nije pronađen kandidat sa ID " + request.kompanija_id);
            }

            dbContext.Remove(kompanija);
            await dbContext.SaveChangesAsync();

            return new KompanijaDeleteResponse() { };
        }
    }
}
