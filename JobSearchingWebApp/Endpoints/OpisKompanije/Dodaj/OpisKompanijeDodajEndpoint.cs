using JobSearchingWebApp.Data;
using JobSearchingWebApp.Database;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Dodaj
{
    [Authorize(Roles = "Admin, Kompanija")]
    [Tags("OpisKomanije")]
    [Route("opis-kompanije-dodaj")]
    public class OpisKompanijeDodajEndpoint : MyBaseEndpoint<OpisKompanijeDodajRequest, ActionResult<OpisKompanijeDodajResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Korisnik> userManager;

        public OpisKompanijeDodajEndpoint(ApplicationDbContext dbContext, UserManager<Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        [HttpPost]
        public override async Task<ActionResult<OpisKompanijeDodajResponse>> MyAction(OpisKompanijeDodajRequest request, CancellationToken cancellationToken)
        {
            var userId = userManager.GetUserId(User);
            var user = await userManager.GetUserAsync(User);

            if (user == null || user.IsObrisan == true)
            {
                return NotFound($"Unable to load user with ID '{userManager.GetUserId(User)}'.");

            }

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
