using JobSearchingWebApp.Data;
using JobSearchingWebApp.Database;
using JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga;
using JobSearchingWebApp.Helper;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Pretraga
{
    [Authorize]
    [Tags("Korisnik-Notifikacija")]
    [Route("korisnik-notifikacija-pretraga")]
    public class KorisnikNotifikacijaPretragaEndpoint : MyBaseEndpoint<KorisnikNotifikacijaPretragaRequest, ActionResult<KorisnikNotifikacijaPretragaResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Korisnik> userManager;

        public KorisnikNotifikacijaPretragaEndpoint(ApplicationDbContext dbContext, UserManager<Korisnik> userManager, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        [HttpGet]
        public override async Task<ActionResult<KorisnikNotifikacijaPretragaResponse>> MyAction([FromQuery] KorisnikNotifikacijaPretragaRequest request, CancellationToken cancellationToken)
        {
            var userId = userManager.GetUserId(User);
            var user = await userManager.GetUserAsync(User);

            if (user == null || user.IsObrisan == true)
            {
                return NotFound($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            if (userId == request.korisnik_id)
            {
                var korisnici_notifikacije = await dbContext
                            .KorisnikNotifikacije
                            .Where(x => (request.korisnik_id == null || x.KorisnikId == request.korisnik_id)
                                     && (request.notifikacija_id == null || x.NotifikacijaId == request.notifikacija_id)
                                     && (request.datum_primanja == null || x.DatumPrimanja == request.datum_primanja)
                                     && (request.pogledano == null || x.Pogledano == request.pogledano))
                            .Select(x => new KorisniciNotifikacijePretragaResponse()
                            {
                                KorisnikId = x.KorisnikId,
                                NotifikacijaId = x.NotifikacijaId,
                                DatumPrimanja = x.DatumPrimanja,
                                Pogledano = x.Pogledano
                            }).ToListAsync();

                return new KorisnikNotifikacijaPretragaResponse { KorisniciNotifikacije = korisnici_notifikacije };
            }

            else return Unauthorized(); 
        }
    }
}
