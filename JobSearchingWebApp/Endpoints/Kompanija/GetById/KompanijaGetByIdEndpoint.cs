using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.GetById;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Kompanija.GetById
{
    [Tags("Kompanija")]
    [Route("kompanija/get-by-id")]
    public class KompanijaGetByIdEndpoint : MyBaseEndpoint<string, KompanijaGetByIdResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaGetByIdEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public override async Task<KompanijaGetByIdResponse> MyAction(string id, CancellationToken cancellationToken)
        {
            var kompanija = dbContext.Kompanije.Include(oglas => oglas.Oglasi).Where(x => x.Id == id).FirstOrDefault();

            if (kompanija == null)
                throw new Exception("Ne postoji kompanija sa ID " + id);

            var response = new KompanijaGetByIdResponse()
            {
                Id = kompanija.Id,  
                Naziv = kompanija.Naziv,    
                GodinaOsnivanja = kompanija.GodinaOsnivanja, 
                BrojZaposlenih = kompanija.BrojZaposlenih, 
                KratkiOpis = kompanija.KratkiOpis, 
                Opis = kompanija.Opis, 
                Website = kompanija.Website ?? null,
                LinkedIn = kompanija.LinkedIn ?? null,
                Twitter = kompanija.Twitter ?? null,
                Logo = kompanija.Logo ?? null,
                Lokacija = kompanija.Lokacija,
                BrojOtvorenihPozicija = kompanija.Oglasi.Count(x => x.KompanijaId == kompanija.Id && x.RokPrijave > DateTime.Now),
            };

            return response; 
        }
    }
}
