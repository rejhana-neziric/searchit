using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Database;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Microsoft.AspNetCore.Identity;
using MapsterMapper;

namespace JobSearchingWebApp.Endpoints.Kompanija.Update
{
    [Authorize(Roles ="Kompanija")]
    [Tags("Kompanija")]
    [Route("kompanija-update")]
    public class KompanijaUpdateEndpoint : MyBaseEndpoint<KompanijaUpdateRequest, ActionResult<KompanijaUpdateResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Korisnik> userManager;

        public KompanijaUpdateEndpoint(ApplicationDbContext dbContext, UserManager<Korisnik> userManager, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userManager = userManager; 
        }

        [HttpPut]
        public override async Task<ActionResult<KompanijaUpdateResponse>> MyAction(KompanijaUpdateRequest request, CancellationToken cancellationToken)
        {
            var userId = userManager.GetUserId(User);
            var user = await userManager.GetUserAsync(User);

            if (user == null || user.IsObrisan == true)
            {
                return NotFound(new { message = $"Unable to load user with ID {userManager.GetUserId(User)}." });
            }

            var kompanija = await dbContext.Kompanije.FindAsync(request.Id);

            if (kompanija == null || kompanija.IsObrisan == true)
            {
                return NotFound(new { message = $"Unable to load user with ID {request.Id}." });
            }

            if (request.Id == userId)
            {
                kompanija.LinkedIn = request.LinkedIn ?? kompanija.LinkedIn;
                kompanija.BrojZaposlenih = request.BrojZaposlenih ?? kompanija.BrojZaposlenih;
                kompanija.Naziv = request.Naziv ?? kompanija.Naziv;
                kompanija.Website = request.Website ?? kompanija.Website;
                kompanija.LinkedIn = request.LinkedIn ?? kompanija.LinkedIn;
                kompanija.Twitter = request.Twitter ?? kompanija.Twitter;
                kompanija.Lokacija = request.Lokacija ?? kompanija.Lokacija;
                kompanija.Opis = request.Opis ?? kompanija.Opis;
                kompanija.KratkiOpis = request.KratkiOpis ?? kompanija.KratkiOpis;

                byte[] logoBytes = null;

                if (!string.IsNullOrEmpty(request.Logo))
                {
                    var base64Data = Regex.Replace(request.Logo, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);
                    logoBytes = Convert.FromBase64String(base64Data);
                }

                kompanija.Logo = logoBytes;

                await dbContext.SaveChangesAsync();

                return new KompanijaUpdateResponse { Id = request.Id };
            }
           
            else return Unauthorized();
        }
    }
}
