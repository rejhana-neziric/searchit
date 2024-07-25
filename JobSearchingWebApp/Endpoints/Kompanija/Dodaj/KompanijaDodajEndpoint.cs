using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Runtime.CompilerServices;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace JobSearchingWebApp.Endpoints.Kompanija.Dodaj
{
    [Tags("Kompanija")]
    [Route("kompanija-dodaj")]
    public class KompanijaDodajEndpoint : MyBaseEndpoint<KompanijaDodajRequest, AuthenticateResponse>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;
        private readonly ITokenGenerator tokenGenerator;

        public KompanijaDodajEndpoint(ApplicationDbContext dbContext, IMapper mapper, ITokenGenerator tokenGenerator)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        public override async Task<AuthenticateResponse> MyAction(KompanijaDodajRequest request, CancellationToken cancellationToken)
        {
            var kompanija = mapper.Map<Models.Kompanija>(request);

            kompanija.PasswordSalt = HelperMethods.GenerateSalt();
            kompanija.PasswordHash = HelperMethods.GenerateHash(kompanija.PasswordSalt, request.Password);
            kompanija.UlogaId = 3;

            await dbContext.Kompanije.AddAsync(kompanija);
            await dbContext.SaveChangesAsync();

            var korisnik = mapper.Map<Models.Korisnik>(kompanija);

            var token = await tokenGenerator.GenerateJwtToken(korisnik);

            return new AuthenticateResponse(korisnik, token);
        }
    }
}
