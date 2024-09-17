using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Dodaj
{
    [Tags("OpisKomanije")]
    [Route("opis-kompanije-dodaj")]
    public class OpisKompanijeDodajEndpoint : MyBaseEndpoint<OpisKompanijeDodajRequest, OpisKompanijeDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OpisKompanijeDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OpisKompanijeDodajResponse> MyAction(OpisKompanijeDodajRequest request, CancellationToken cancellationToken)
        {
            var opis_kompanije = new Database.OpisKompanije()
            {
                OpisPoslovanja = request.opis_poslovanja, 
                BrojOtvorenihPozicija = request.broj_otvorenih_pozicija, 
                BrojZaposlenika = request.broj_zaposlenika
            };

            dbContext.OpisiKompanija.Add(opis_kompanije);
            await dbContext.SaveChangesAsync();

            return new OpisKompanijeDodajResponse { Id = opis_kompanije.Id };
        }
    }
}
