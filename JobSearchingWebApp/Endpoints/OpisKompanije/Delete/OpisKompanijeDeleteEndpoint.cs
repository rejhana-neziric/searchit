using JobSearchingWebApp.Data;
using JobSearchingWebApp.Database;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Delete
{
    [Authorize(Roles = "Admin, Kompanija")]
    [Tags("OpisKomanije")]
    [Route("opis-kompanije-delete")]
    public class OpisKompanijeDeleteEndpoint : MyBaseEndpoint<OpisKompanijeDeleteRequest, ActionResult<OpisKompanijeDeleteResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Korisnik> userManager;

        public OpisKompanijeDeleteEndpoint(ApplicationDbContext dbContext, UserManager<Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        [HttpDelete]
        public override async Task<ActionResult<OpisKompanijeDeleteResponse>> MyAction([FromQuery] OpisKompanijeDeleteRequest request, CancellationToken cancellationToken)
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
                throw new Exception("Nije pronađen opis kompanije sa ID " + request.opis_kompanije_id);
            }

            dbContext.Remove(opis_kompanije);
            await dbContext.SaveChangesAsync();

            return new OpisKompanijeDeleteResponse() { };
        }
    }
}
