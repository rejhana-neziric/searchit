using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Update;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Update
{
    [Tags("RadnoIskustvo")]
    [Route("radno-iskustvo-update")]
    public class RadnoIskustvoUpdateEndpoint : MyBaseEndpoint<RadnoIskustvoUpdateRequest, RadnoIskustvoUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public RadnoIskustvoUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<RadnoIskustvoUpdateResponse> MyAction(RadnoIskustvoUpdateRequest request, CancellationToken cancellationToken)
        {
            var radno_iskustvo = dbContext.RadnoIskustvo.FirstOrDefault(x => x.Id == request.radno_iskustvo_id);

            if (radno_iskustvo == null)
            {
                throw new Exception("Nije pronađen radno iskustvo sa ID " + request.radno_iskustvo_id);
            }

            radno_iskustvo.NazivPozicija = request.naziv_pozicije; 
            radno_iskustvo.DatumPocetka = request.datum_pocetka;    
            radno_iskustvo.DatumZavrsetka = request.datum_zavrsetka;    
            radno_iskustvo.NazivKompanije = request.naziv_kompanije;
            radno_iskustvo.Opis = request.opis;

            await dbContext.SaveChangesAsync();

            return new RadnoIskustvoUpdateResponse { Id = radno_iskustvo.Id };
        }
    }
}
