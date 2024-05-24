using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Recenzije.Pretraga
{
    [Tags("Recenzije")]
    [Route("recenzije-pretraga")]
    public class RecenzijePretragaEndpoint:MyBaseEndpoint<RecenzijePretragaRequest, RecenzijePretragaResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        public RecenzijePretragaEndpoint(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<RecenzijePretragaResponse> MyAction([FromQuery]RecenzijePretragaRequest request, CancellationToken cancellationToken)
        {
            var recenzije = await _dbContext
                .Recenzije
                .Where(x => (request.tekst == null || x.Tekst.ToLower().StartsWith(request.tekst.ToLower())
                && (request.pozicija == null || x.Pozicija.ToLower().StartsWith(request.pozicija.ToLower())
                && (request.korisnik_id == null || request.korisnik_id == x.KorisnikId)
                && (request.brojZvijezdica == null || request.brojZvijezdica == x.BrojZvijezdica))))
                .Select(x => new RecenzijaPretragaResponse()
                {
                    Pozicija = x.Pozicija,
                    BrojZvijezdica=x.BrojZvijezdica,
                    DatumVrijemeRecenzije=x.DatumVrijemeRecenzije,
                    KorisnikId=x.KorisnikId,
                    Tekst=x.Tekst
                }).ToListAsync();

            return new RecenzijePretragaResponse() { Recenzije = recenzije };
        }
    }
}
