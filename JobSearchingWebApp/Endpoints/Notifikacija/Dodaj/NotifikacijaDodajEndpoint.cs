using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Notifikacija.Dodaj
{
    [Route("notifikacija-dodaj")]
    public class NotifikacijaDodajEndpoint : MyBaseEndpoint<NotifikacijaDodajRequest, NotifikacijaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public NotifikacijaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<NotifikacijaDodajResponse> MyAction(NotifikacijaDodajRequest request)
        {
            var notifikacija = new Models.Notifikacija()
            {
                Naziv = request.naziv,
                Vrsta = request.vrsta
            };

            dbContext.Notifikacije.Add(notifikacija);
            await dbContext.SaveChangesAsync();

            return new NotifikacijaDodajResponse { Id = notifikacija.Id };
        }
    }
}
