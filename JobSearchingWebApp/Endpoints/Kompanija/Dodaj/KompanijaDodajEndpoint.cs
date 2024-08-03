using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Runtime.CompilerServices;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace JobSearchingWebApp.Endpoints.Kompanija.Dodaj
{
    [Tags("Kompanija")]
    [Route("kompanija-dodaj")]
    public class KompanijaDodajEndpoint : MyBaseEndpoint<KompanijaDodajRequest, IActionResult>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;
        private readonly UserManager<Models.Korisnik> userManager;

        public KompanijaDodajEndpoint(ApplicationDbContext dbContext, IMapper mapper, UserManager<Models.Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        [HttpPost]
        public override async Task<IActionResult> MyAction(KompanijaDodajRequest request, CancellationToken cancellationToken)
        { 
            var kompanija = mapper.Map<Models.Kompanija>(request);
            kompanija.PasswordSalt = HelperMethods.GenerateSalt();
            kompanija.UlogaId = 3;

            var result = await userManager.CreateAsync(kompanija, request.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await userManager.AddToRoleAsync(kompanija, "Kompanija");

            return Ok(new { Result = "User created successfully" });
        }
    }
}
