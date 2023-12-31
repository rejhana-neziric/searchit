using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Delete
{
    [Tags("RadnoIskustvo")]
    [Route("radno-iskustvo-delete")]
    public class RadnoIskustvoDeleteEndpoint : MyBaseEndpoint<RadnoIskustvoDeleteRequest, RadnoIskustvoDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public RadnoIskustvoDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<RadnoIskustvoDeleteResponse> MyAction([FromQuery]RadnoIskustvoDeleteRequest request, CancellationToken cancellationToken)
        {
            var radno_iskustvo = dbContext.RadnoIskustvo.FirstOrDefault(x => x.Id == request.radno_iskustvo_id);

            if (radno_iskustvo == null)
            {
                throw new Exception("Nije pronađeno radno iskustvo sa ID " + request.radno_iskustvo_id);
            }

            dbContext.Remove(radno_iskustvo);
            await dbContext.SaveChangesAsync();

            return new RadnoIskustvoDeleteResponse() { };
        }
    }
}
