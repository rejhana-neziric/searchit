using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.GetById;
using JobSearchingWebApp.Endpoints.Oglas.GetById;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Kompanija.GetById
{
    [Tags("Kompanija")]
    [Route("kompanija/get-by-id")]
    public class KompanijaGetByIdEndpoint : MyBaseEndpoint<string, ActionResult<KompanijaGetByIdResponse>>
    {
        private readonly UserManager<Models.Korisnik> userManager;
        private readonly IMapper mapper;

        public KompanijaGetByIdEndpoint(UserManager<Models.Korisnik> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public override async Task<ActionResult<KompanijaGetByIdResponse>> MyAction(string id, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null) return BadRequest(new { message = $"User with ID {id} doesn't exist." });
            if (user.UlogaId != 3) return BadRequest(new { message = $"User with ID {id} is not company." });

            var response = mapper.Map<KompanijaGetByIdResponse>(user);

            response.Logo = (user as Models.Kompanija)!.Logo != null ? Convert.ToBase64String((user as Models.Kompanija)!.Logo) : null;

            return response;
        }
    }
}
