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
                Objavljen = request?.objavljen
            };

            foreach (var nazivLokacije in request.lokacija)
            {
                // Check if this experience already exists
                var existingLokacija = dbContext.Lokacija.FirstOrDefault(x => x.Naziv.ToLower() == nazivLokacije.ToLower());

                // If it doesn't exist, add a new one
                if (existingLokacija == null)
                {
                    existingLokacija = new Lokacija() { Naziv = nazivLokacije };
                    dbContext.Lokacija.Add(existingLokacija);
                    await dbContext.SaveChangesAsync();  // Save the new experience to avoid duplicates
                }

                // Add the experience to the oglas
                oglas.OglasLokacija.Add(new OglasLokacija() { Lokacija = existingLokacija });
            }

            foreach (var nazivIskustva in request.iskustvo)
            {
                // Check if this experience already exists
                var existingIskustvo = dbContext.Iskustvo.FirstOrDefault(x => x.Naziv.ToLower() == nazivIskustva.ToLower());

                // If it doesn't exist, add a new one
                if (existingIskustvo == null)
                {
                    existingIskustvo = new Iskustvo() { Naziv = nazivIskustva };
                    dbContext.Iskustvo.Add(existingIskustvo);
                    await dbContext.SaveChangesAsync();  // Save the new experience to avoid duplicates
                }

                // Add the experience to the oglas
                oglas.OglasIskustvo.Add(new OglasIskustvo() { Iskustvo = existingIskustvo });
            }

            // Save the oglas and related entities
            dbContext.Oglasi.Add(oglas);
            await dbContext.SaveChangesAsync();

            return new OglasDodajResponse { Id = oglas.Id };
        }
    }
}
