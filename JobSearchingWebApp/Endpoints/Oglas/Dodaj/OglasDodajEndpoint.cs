using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.Dodaj
{
    [Tags("Oglas")]
    [Route("oglas-dodaj")]
    public class OglasDodajEndpoint : MyBaseEndpoint<OglasDodajRequest, OglasDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OglasDodajResponse> MyAction(OglasDodajRequest request, CancellationToken cancellationToken)
        {
            var oglas = new Models.Oglas()
            {
                KompanijaId = request.kompanija_id,
                NazivPozicije = request.naziv_pozicije,
                DatumObjave = request.datum_objave,
                Plata = request.plata,
                TipPosla = request.tip_posla,
                RokPrijave = request.rok_prijave,
                DatumModificiranja = request.datum_modificiranja,
                OpisOglas = new Models.OpisOglas()
                {
                    OpisPozicije = request.opis_pozicije,
                    MinimumGodinaIskustva = request?.minimum_godina_iskustva,
                    PrefiraneGodineIskstva = request?.preferirane_godine_iskustva,
                    Benefiti = request?.benefiti,
                    Kvalifikacija = request?.kvalifikacija,
                    Vjestine = request?.vjestine,
                },
                
            };
            var lokacije = dbContext.Lokacija.Where(x=> x.Naziv.ToLower().Contains(request.lokacija.ToLower())).ToList();

            if(lokacije == null)
            {
                dbContext.Lokacija.Add(new Lokacija() { Naziv = request.lokacija });
            }
            

            OglasLokacija nova = new OglasLokacija()
            {
                Lokacija = new Lokacija() { Naziv = request.lokacija},
                Oglas = oglas
            };

            oglas.OglasLokacija.Add(nova);

            foreach (var item in request.iskustvo)
            {
                oglas.OglasIskustvo.Add(new OglasIskustvo() { Iskustvo = new Iskustvo() { Naziv = item } });
            }

            dbContext.Oglasi.Add(oglas);
            await dbContext.SaveChangesAsync(); 

            return new OglasDodajResponse { Id = oglas.Id };
        }
    }
}
