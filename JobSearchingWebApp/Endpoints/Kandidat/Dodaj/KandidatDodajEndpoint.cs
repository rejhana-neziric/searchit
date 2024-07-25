using Azure.Core;
using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using JobSearchingWebApp.Helper.Services;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace JobSearchingWebApp.Endpoints.Kandidat.Dodaj
{
    [Tags("Kandidat")]
    [Route("kandidat-dodaj")]
    public class KandidatDodajEndpoint : MyBaseEndpoint<KandidatDodajRequest, AuthenticateResponse>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;
        private readonly ITokenGenerator tokenGenerator;

        public KandidatDodajEndpoint(ApplicationDbContext dbContext, IMapper mapper, ITokenGenerator tokenGenerator)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        public override async Task<AuthenticateResponse> MyAction(KandidatDodajRequest request, CancellationToken cancellationToken)
        {
            var kandidat = mapper.Map<Models.Kandidat>(request);

            kandidat.PasswordSalt = HelperMethods.GenerateSalt();
            kandidat.PasswordHash = HelperMethods.GenerateHash(kandidat.PasswordSalt, request.Password);
            kandidat.UlogaId = 2;


            await dbContext.Kandidati.AddAsync(kandidat);
            await dbContext.SaveChangesAsync();

            var korisnik = mapper.Map<Models.Korisnik>(kandidat);

            var token = await tokenGenerator.GenerateJwtToken(korisnik);

            return new AuthenticateResponse(korisnik, token);
        }
    }
}
