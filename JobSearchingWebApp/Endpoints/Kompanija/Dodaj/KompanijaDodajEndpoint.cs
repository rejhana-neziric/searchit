using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kompanija.Dodaj
{
    [Tags("Kompanija")]
    [Route("kompanija-dodaj")]
    public class KompanijaDodajEndpoint : MyBaseEndpoint<KompanijaDodajRequest, KompanijaDodajResponse>
    {
        private readonly ApplicationDbContext dbContext; 

        public KompanijaDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KompanijaDodajResponse> MyAction(KompanijaDodajRequest request, CancellationToken cancellationToken)
        {
            var korisnik = new Korisnik()
            {
                Email = request.email,
                Username = request.username,
                Password = request.password,
                TemaId = request.tema_id,
                JezikId = request.jezik_id,
                isKandidat = false,
                isKompanija = true
            };

            var kompanija = new Models.Kompanija(korisnik)
            {
                Naziv = request.naziv,
                GodinaOsnivanja = request.godina_osnivanja,
                Lokacija = request.lokacija,
                Slika = request.slika,
            };

            dbContext.Kompanije.Add(kompanija);
            await dbContext.SaveChangesAsync();

            return new KompanijaDodajResponse { Id = kompanija.Id };
        }
    }
}
