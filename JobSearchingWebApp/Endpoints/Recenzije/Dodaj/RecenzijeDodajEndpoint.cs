using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Recenzije.Dodaj
{
    [Tags("Recenzije")]
    [Microsoft.AspNetCore.Components.Route("recenzije-dodaj")]
    public class RecenzijeDodajEndpoint:MyBaseEndpoint<RecenzijeDodajRequest, RecenzijeDodajResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        public RecenzijeDodajEndpoint(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public override async Task<RecenzijeDodajResponse> MyAction(RecenzijeDodajRequest request, CancellationToken cancellationToken)
        {
            var recenzija = new Database.Recenzija()
            {
                Tekst = request.tekst,
                DatumVrijemeRecenzije = request.datum_vrijeme_recenzije,
                Pozicija = request.pozicija,
                BrojZvijezdica = request.broj_zvijezdica,
                KorisnikId = request.korisnik_id
            };

            _dbContext.Recenzije.Add(recenzija);
            await _dbContext.SaveChangesAsync();

            return new RecenzijeDodajResponse { Id = recenzija.Id };
        }
    }
}
