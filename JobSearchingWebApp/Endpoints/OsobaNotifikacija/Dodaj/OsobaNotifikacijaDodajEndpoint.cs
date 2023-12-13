using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Dodaj
{
    [Route("osoba-notifikacija-dodaj")]
    public class OsobaNotifikacijaDodajEndpoint : MyBaseEndpoint<OsobaNotifikacijaDodajRequest, OsobaNotifikacijaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OsobaNotifikacijaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OsobaNotifikacijaDodajResponse> MyAction(OsobaNotifikacijaDodajRequest request)
        {
            var osoba_notifikacija = new Models.OsobaNotifikacije()
            {
                OsobaId = request.osoba_id, 
                NotifikacijaId = request.notifikacija_id, 
                DatumPrimanja = request.datum_primanja,
                Pogledano = request.pogledano
            }; 

            dbContext.OsobaNotifikacije.Add(osoba_notifikacija);
            await dbContext.SaveChangesAsync();

            return new OsobaNotifikacijaDodajResponse { Id = osoba_notifikacija.Id };
        }
    }
}
