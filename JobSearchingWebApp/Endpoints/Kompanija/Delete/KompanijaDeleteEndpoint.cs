using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kompanija.Delete
{
    [Tags("Kompanija")]
    [Route("kompanija-delete")]
    public class KompanijaDeleteEndpoint : MyBaseEndpoint<string, ActionResult<KompanijaDeleteResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Database.Korisnik> userManager;

        public KompanijaDeleteEndpoint(ApplicationDbContext dbContext, UserManager<Database.Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        [HttpDelete("{id}")]
        public override async Task<ActionResult<KompanijaDeleteResponse>> MyAction(string id, CancellationToken cancellationToken)
        {
            var userId = userManager.GetUserId(User);
            var user = await userManager.FindByIdAsync(userId);

            if (id == userId || user.UlogaId == 1)
            {

                var kompanija = dbContext.Kompanije.FirstOrDefault(x => x.Id == id);

                if (kompanija == null)
                    return BadRequest();

                await userManager.RemoveFromRoleAsync(kompanija, "Kompanija");
                await userManager.DeleteAsync(kompanija);

                return new KompanijaDeleteResponse() { };
            }

            else
                return Unauthorized();
        }
    }
}
