using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JobSearchingWebApp.Endpoints.Kandidat.Dodaj
{
    [Tags("Kandidat")]
    [Route("kandidat-dodaj")]
    public class KandidatDodajEndpoint : MyBaseEndpoint<KandidatDodajRequest, KandidatDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatDodajResponse> MyAction(KandidatDodajRequest request, CancellationToken cancellationToken)
        {
            var korisnik = new Models.Korisnik()
            {
                Email = request.email,
                Username = request.username,
                Password = request.password,
                TemaId = request.tema_id,
                JezikId = request.jezik_id,
                isKandidat = true,
                isKompanija = false
            };

            var kandidat = new Models.Kandidat(korisnik)
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
