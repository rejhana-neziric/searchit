using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kandidat.Delete
{
    [Authorize(Roles = "Admin, Kandidat")]
    [Tags("Kandidat")]
    [Route("kandidat-delete")]
    public class KandidatDeleteEndpoint : MyBaseEndpoint<string, ActionResult<KandidatDeleteResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Models.Korisnik> userManager;

        public KandidatDeleteEndpoint(ApplicationDbContext dbContext, UserManager<Models.Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager; 
        }

        [HttpDelete("{id}")]
        public override async Task<ActionResult<KandidatDeleteResponse>> MyAction(string id, CancellationToken cancellationToken)
        {

            var userId = userManager.GetUserId(User);
            var user = await userManager.FindByIdAsync(userId);

            if (id == userId || user.UlogaId == 1)
            {

                var kandidat = dbContext.Kandidati.FirstOrDefault(x => x.Id == id);

                if (kandidat == null)
                    return BadRequest();

                await userManager.RemoveFromRoleAsync(kandidat, "Kandidat");
                await userManager.DeleteAsync(kandidat);

                return new KandidatDeleteResponse() { };
            }

            else
                return Unauthorized();
        }
    }
}
