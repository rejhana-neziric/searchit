using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.GetAll;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kompanija.GetAll
{
    [Tags("Kompanija")]
    [Route("kompanija-get")]
    public class KompanijaGetAllEndpoint : MyBaseEndpoint<KompanijaGetAllRequest, KompanijaGetAllResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaGetAllEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<KompanijaGetAllResponse> MyAction([FromQuery] KompanijaGetAllRequest request, CancellationToken cancellationToken)
        {
            var kompanije = dbContext.Kompanije.AsQueryable();
            var oglasi = dbContext.Oglasi.Include(kompanija => kompanija.Kompanija).AsQueryable();

            if (!string.IsNullOrEmpty(request.Naziv))
            {
                kompanije = kompanije.Where(kompanija => kompanija.Naziv.ToLower().Contains(request.Naziv.ToLower()));
            }

            if (request?.Lokacija?.Count > 0)
            {
                kompanije = kompanije.Where(kompanija => request.Lokacija.Contains(kompanija.Lokacija));
            }

            if (request?.BrojZaposlenih?.Count > 0)
            {
                kompanije = kompanije.Where(kompanija => request.BrojZaposlenih.Contains(kompanija.BrojZaposlenih));
            }

            if (request?.ImaOtvorenePozicije != null)
            {
                if(request.ImaOtvorenePozicije == "Positions available")
                {
                    kompanije = kompanije.Where(kompanija => oglasi
                                   .Any(oglas => oglas.KompanijaId == kompanija.Id && oglas.RokPrijave > DateTime.Now));
                }
                
                else if (request.ImaOtvorenePozicije == "No open positions")
                {
                    kompanije = kompanije.Where(kompanija => !(oglasi
                                   .Any(oglas => oglas.KompanijaId == kompanija.Id && oglas.RokPrijave > DateTime.Now)));
                }
               
            }

            var lista = kompanije.Select(kompanija => new KompanijaGetAllResponseKompanija
            {
                Id = kompanija.Id,
                Naziv = kompanija.Naziv,
                Lokacija = kompanija.Lokacija,
                GodinaOsnivanja = kompanija.GodinaOsnivanja,
                Logo = kompanija.Logo ?? null,
                BrojZaposlenih = kompanija.BrojZaposlenih,
                KratkiOpis = kompanija.KratkiOpis,
                Opis = kompanija.Opis,
                Website = kompanija.Website ?? null,
                LinkedIn = kompanija.LinkedIn ?? null,
                Twitter = kompanija.Twitter ?? null, 
                BrojOtvorenihPozicija = kompanija.Oglasi.Count(x => x.KompanijaId == kompanija.Id && x.RokPrijave > DateTime.Now),
            })
                .ToList();

            return new KompanijaGetAllResponse { Kompanije =  lista };  
        }
    }
}
