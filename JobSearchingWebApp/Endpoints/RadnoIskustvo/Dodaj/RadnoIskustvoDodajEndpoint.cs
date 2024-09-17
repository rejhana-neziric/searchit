using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Database;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Dodaj
{
    [Tags("RadnoIskustvo")]
    [Microsoft.AspNetCore.Mvc.Route("radno-iskustvo-dodaj")]
    public class RadnoIskustvoDodajEndpoint : MyBaseEndpoint<RadnoIskustvoDodajRequest, RadnoIskustvoDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public RadnoIskustvoDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<RadnoIskustvoDodajResponse> MyAction(RadnoIskustvoDodajRequest request, CancellationToken cancellationToken)
        {
            var radno_iskustvo = new Database.RadnoIskustvo()
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
