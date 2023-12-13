using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Dodaj
{
    [Route("radno-iskustvo-dodaj")]
    public class RadnoIskustvoDodajEndpoint : MyBaseEndpoint<RadnoIskustvoDodajRequest, RadnoIskustvoDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public RadnoIskustvoDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<RadnoIskustvoDodajResponse> MyAction(RadnoIskustvoDodajRequest request)
        {
            var radno_iskustvo = new Models.RadnoIskustvo()
            {
                NazivPozicija = request.naziv_pozicije, 
                DatumPocetka = request.datum_pocetka, 
                DatumZavrsetka = request.datum_zavrsetka,   
                NazivKompanije = request.naziv_kompanije,   
                Opis = request.opis,    
                CVId = request.cv_id
            }; 

            dbContext.RadnoIskustvo.Add(radno_iskustvo);
            await dbContext.SaveChangesAsync();

            return new RadnoIskustvoDodajResponse { Id = radno_iskustvo.Id };
        }
    }
}
