using Azure.Core;
using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kandidat.GetById
{
    [Tags("Kandidat")]
    [Route("kandidat/get-by-id")]
    public class KandidatGetByIdEndpoint : MyBaseEndpoint<string, ActionResult<KandidatGetByIdResponse>>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Models.Korisnik> userManager;
        private readonly IMapper mapper;

        public KandidatGetByIdEndpoint(ApplicationDbContext dbContext, UserManager<Models.Korisnik> userManager, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userManager = userManager; 
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public override async Task<ActionResult<KandidatGetByIdResponse>> MyAction(string id, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null) return BadRequest(new { message = $"User with ID {id} doesn't exist." });
            if (user.UlogaId == 1) return BadRequest(new { message = $"User with ID {id} is not candidate." });

            var response = mapper.Map<KandidatGetByIdResponse>(user);

            return response; 
        }
    }
}
