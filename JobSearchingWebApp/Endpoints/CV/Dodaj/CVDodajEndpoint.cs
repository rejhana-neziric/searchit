using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CV.Dodaj
{
    [Tags("CV")]
    [Route("cv-dodaj")]
    public class CVDodajEndpoint : MyBaseEndpoint<CVDodajRequest, ActionResult<CVDodajResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper; 

        public CVDodajEndpoint(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
                this.mapper = mapper;
        }

        [HttpPost]
        public override async Task<ActionResult<CVDodajResponse>> MyAction([FromBody]CVDodajRequest request, CancellationToken cancellationToken)
        {

            // Kreiranje CV-a
            var cv = new Models.CV
            {
                Ime = request.Ime,
                Prezime = request.Prezime,
                Email = request.Email,
                BrojTelefona = request.BrojTelefona,
                Drzava = request.Drzava,
                Grad = request.Grad,
                ProfesionalniSazetak = request.ProfesionalniSazetak,
                Vještine = request.Vještine,
                TehničkeVještine = request.TehničkeVještine,
                Kursevi = request.Kursevi
            };

            dbContext.CV.Add(cv);
            await dbContext.SaveChangesAsync();  // Generisanje CVId

            // Dodavanje edukacija
            var edukacijaIds = new List<int>();

            foreach (var edukacijaRequest in request.Edukacija)
            {
                var edukacija = new Edukacija
                {
                    NazivSkole = edukacijaRequest.NazivSkole,
                    DatumPocetka = edukacijaRequest.DatumPocetka,
                    DatumZavrsetka = edukacijaRequest.DatumZavrsetka,
                    Grad = edukacijaRequest.Grad,
                    Opis = edukacijaRequest.Opis
                };

                dbContext.Edukacija.Add(edukacija);
                await dbContext.SaveChangesAsync();  // Generisanje EdukacijaId

                edukacijaIds.Add(edukacija.Id);
            }

            // Dodavanje CVEdukacija
            foreach (var edukacijaId in edukacijaIds)
            {
                var cvEdukacija = new CVEdukacija
                {
                    CVId = cv.Id,  
                    EdukacijaId = edukacijaId 
                };

                dbContext.CVEdukacija.Add(cvEdukacija);
            }

            await dbContext.SaveChangesAsync();

            // Dodavanje zaposlenja
            var zaposlenjeIds = new List<int>();

            foreach (var zaposlenjeRequest in request.Zasposlenje)
            {
                var zaposlenje = new Zaposlenje
                {
                    NazivKompanije = zaposlenjeRequest.NazivKompanije,
                    NazivPozicije = zaposlenjeRequest.NazivPozicije,
                    DatumPocetka = zaposlenjeRequest.DatumPocetka,
                    DatumZavrsetka = zaposlenjeRequest.DatumZavrsetka,
                    Opis = zaposlenjeRequest.Opis
                };

                dbContext.Zaposlenje.Add(zaposlenje);
                await dbContext.SaveChangesAsync();  // Generisanje ZaposlenjeId

                zaposlenjeIds.Add(zaposlenje.Id);
            }

            // Dodavanje CVZaposlenje
            foreach (var zaposlenjeId in zaposlenjeIds)
            {
                var cvZaposlenje = new CVZaposlenje
                {
                    CVId = cv.Id,
                    ZaposlenjeId = zaposlenjeId  
                };

                dbContext.CVZaposlenje.Add(cvZaposlenje);
            }

            // Dodavanje URL
            var urlIds = new List<int>();

            foreach (var urlRequest in request.URL)
            {
                var url = new URL
                {
                    Naziv = urlRequest.Naziv,
                    Putanja = urlRequest.Putanja
                };

                dbContext.URL.Add(url);
                await dbContext.SaveChangesAsync();  // Generisanje URLId

                urlIds.Add(url.Id);
            }

            // Dodavanje CVURL
            foreach (var urlId in urlIds)
            {
                var cvURL = new CVURL
                {
                    CVId = cv.Id,  
                    URLId = urlId 
                };

                dbContext.CVURL.Add(cvURL);
            }

            // Save all changes
            await dbContext.SaveChangesAsync();

            return Ok(cv.Id);
        }
    }
}
