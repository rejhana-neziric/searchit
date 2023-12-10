using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JobSearchingWebApp.Endpoints.Kandidat.Dodaj
{
    [Route("kandidat-dodaj")]
    public class KandidatDodajEndpoint : MyBaseEndpoint<KandidatDodajRequest, KandidatDodajResponse>
    {
        private readonly ApplicationDbContext dbContext; 

        public KandidatDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;   
        }

        [HttpPost]
        public override async Task<KandidatDodajResponse> MyAction(KandidatDodajRequest request)
        {
            var osoba = new Models.Osoba()
            {
                Email = request.email,
                Username = request.username,
                Password = request.password,
                TemaId = request.tema_id,
                JezikId = request.jezik_id
            };

            var kandidat = new Models.Kandidat(osoba)
            { 
                Ime = request.ime, 
                Prezime = request.prezime,  
                DatumRodjenja = request.datum_rodjenja,
                MjestoPrebivalista = request.mjesto_prebivalista,   
                Zvanje = request.zvanje,    
                BrojTelefona = request.broj_telefona,
            };

            dbContext.Kandidati.Add(kandidat);
            await dbContext.SaveChangesAsync();

            return new KandidatDodajResponse { Id = kandidat.Id };
        }
    }
}
