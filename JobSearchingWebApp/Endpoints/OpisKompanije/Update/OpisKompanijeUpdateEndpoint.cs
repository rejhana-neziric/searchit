using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Update
{
    [Route("opis-kompanije-update")]
    public class OpisKompanijeUpdateEndpoint : MyBaseEndpoint<OpisKompanijeUpdateRequest, OpisKompanijeUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OpisKompanijeUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OpisKompanijeUpdateResponse> MyAction(OpisKompanijeUpdateRequest request)
        {
            var opis_kompanije = dbContext.OpisiKompanija.FirstOrDefault(x => x.Id == request.opis_kompanije_id);

            if (opis_kompanije == null)
            {
                throw new Exception("Nije pronađen opis kompanije sa ID " + request.opis_kompanije_id);
            }

            opis_kompanije.OpisPoslovanja = request.opis_poslovanja;
            opis_kompanije.BrojOtvorenihPozicija = request.broj_otvorenih_pozicija;
            opis_kompanije.BrojZaposlenika = request.broj_zaposlenika;

            await dbContext.SaveChangesAsync();

            return new OpisKompanijeUpdateResponse { id = opis_kompanije.Id };
        }
    }
}
