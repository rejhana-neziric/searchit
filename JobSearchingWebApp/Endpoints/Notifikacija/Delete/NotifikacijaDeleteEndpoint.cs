using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Notifikacija.Delete
{
    [Route("notifikacija-delete")]
    public class NotifikacijaDeleteEndpoint : MyBaseEndpoint<NotifikacijaDeleteRequest, NotifikacijaDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public NotifikacijaDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<NotifikacijaDeleteResponse> MyAction([FromQuery]NotifikacijaDeleteRequest request)
        {
            var notifikacija = dbContext.Notifikacije.FirstOrDefault(x => x.Id == request.notifikacija_id);

            if (notifikacija == null)
            {
                throw new Exception("Nije pronađen oglas sa ID " + request.notifikacija_id);
            }

            dbContext.Remove(notifikacija);
            await dbContext.SaveChangesAsync();

            return new NotifikacijaDeleteResponse() { };
        }
    }
}
