using JobSearchingWebApp.Data;
using JobSearchingWebApp.Database;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Update
{
    [Authorize(Roles = "Admin, Kompanija")]
    [Tags("OpisKomanije")]
    [Route("opis-kompanije-update")]
    public class OpisKompanijeUpdateEndpoint : MyBaseEndpoint<OpisKompanijeUpdateRequest, ActionResult<OpisKompanijeUpdateResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Korisnik> userManager;

        public OpisKompanijeUpdateEndpoint(ApplicationDbContext dbContext, UserManager<Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        [HttpPut]
        public override async Task<ActionResult<OpisKompanijeUpdateResponse>> MyAction(OpisKompanijeUpdateRequest request, CancellationToken cancellationToken)
        {
            var userId = userManager.GetUserId(User);
            var user = await userManager.GetUserAsync(User);

            if (user == null || user.IsObrisan == true)
            {
                return NotFound($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            var opis_kompanije = dbContext.OpisiKompanija.FirstOrDefault(x => x.Id == request.opis_kompanije_id);

            if (opis_kompanije == null)
            {
                return NotFound($"Unable to load post description with ID {request.opis_kompanije_id}.");
            }

            opis_kompanije.OpisPoslovanja = request.opis_poslovanja;
            opis_kompanije.BrojOtvorenihPozicija = request.broj_otvorenih_pozicija;
            opis_kompanije.BrojZaposlenika = request.broj_zaposlenika;

            await dbContext.SaveChangesAsync();

            return new OpisKompanijeUpdateResponse { id = opis_kompanije.Id };
        }
    }
}
