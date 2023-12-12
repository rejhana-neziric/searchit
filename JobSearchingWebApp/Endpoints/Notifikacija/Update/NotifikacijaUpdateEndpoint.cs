using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Update;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Notifikacija.Update
{
    [Route("notifikacija-update")]
    public class NotifikacijaUpdateEndpoint : MyBaseEndpoint<NotifikacijaUpdateRequest, NotifikacijaUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public NotifikacijaUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<NotifikacijaUpdateResponse> MyAction(NotifikacijaUpdateRequest request)
        {
            var notifikacija = dbContext.Notifikacije.FirstOrDefault(x => x.Id == request.notifikacija_id);

            if (notifikacija == null)
            {
                throw new Exception("Nije pronađena notifikacija sa ID " + request.notifikacija_id);
            }

            notifikacija.Naziv = request.naziv; 
            notifikacija.Vrsta = request.vrsta;

            await dbContext.SaveChangesAsync();

            return new NotifikacijaUpdateResponse { Id = notifikacija.Id };
        }
    }
}
