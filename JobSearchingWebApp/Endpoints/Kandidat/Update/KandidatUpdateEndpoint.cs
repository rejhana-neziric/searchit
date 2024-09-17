using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Endpoints.Kandidat.GetById;
using JobSearchingWebApp.Helper;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Kandidat.Update
{

    [Tags("Kandidat")]
    [Route("kandidat-update")]
    public class KandidatUpdateEndpoint : MyBaseEndpoint<KandidatUpdateRequest, ActionResult<KandidatUpdateResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Database.Korisnik> userManager;
        private readonly IMapper mapper;

        public KandidatUpdateEndpoint(ApplicationDbContext dbContext, UserManager<Database.Korisnik> userManager, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpPost]
        public override async Task<ActionResult<KandidatUpdateResponse>> MyAction(KandidatUpdateRequest request, CancellationToken cancellationToken)
        {
            var kandidat = await dbContext.Kandidati.FindAsync(request.Id);
            if (kandidat == null) return BadRequest(new { message = $"User with ID {request.Id} doesn't exist." });
            if (kandidat.UlogaId == 1) return BadRequest(new { message = $"User with ID {request.Id} is not candidate." });

            kandidat.MjestoPrebivalista = request.MjestoPrebivalista ?? kandidat.MjestoPrebivalista;
            kandidat.Zvanje = request.Zvanje ?? kandidat.Zvanje;

            if(!String.IsNullOrEmpty(request.PhoneNumber))
            {
                kandidat.PhoneNumber = request.PhoneNumber;
                kandidat.PhoneNumberConfirmed = false; 
            }

            await dbContext.SaveChangesAsync();

            return new KandidatUpdateResponse { id = kandidat.Id }; 
        }
    }
}
