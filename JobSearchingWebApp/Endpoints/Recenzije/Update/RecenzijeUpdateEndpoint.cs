using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Recenzije.Update
{
    [Tags("Recenzije")]
    [Route("recenzije-update")]
    public class RecenzijeUpdateEndpoint:MyBaseEndpoint<RecenzijeUpdateRequest,RecenzijeUpdateResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        public RecenzijeUpdateEndpoint(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public override async Task<RecenzijeUpdateResponse> MyAction(RecenzijeUpdateRequest request, CancellationToken cancellationToken)
        {
            var recenzija = _dbContext.Recenzije.FirstOrDefault(x => x.Id == request.recenzija_id);
            if (recenzija == null)
            {
                throw new Exception("Nije pronadjena recenzija sa ID: " + request.recenzija_id);
            }

            recenzija.Tekst=request.tekst;
            recenzija.Pozicija=request.pozicija;
            recenzija.BrojZvijezdica = request.broj_zvijezdica;
            recenzija.DatumVrijemeRecenzije=request.datum_vrijeme_recenzije;
            recenzija.KorisnikId=request.korisnik_id;
            
            await _dbContext.SaveChangesAsync();

            return new RecenzijeUpdateResponse { Id = recenzija.Id };
        }
    }
}
