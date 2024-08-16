using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kompanija.Pretraga
{
    [Tags("Kompanija")]
    [Route("kompanija-pretraga")]
    public class KompanijaPretragaEndpoint : MyBaseEndpoint<KompanijaPretragaRequest, KompanijaPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<KompanijaPretragaResponse> MyAction([FromQuery]KompanijaPretragaRequest request, CancellationToken cancellationToken)
        {
            var kompanije = await dbContext
                                .Kompanije
                                .Where(x => (request.naziv == null || x.Naziv.ToLower().StartsWith(request.naziv.ToLower()))
                                         && (request.lokacija == null || x.Lokacija.ToLower().StartsWith(request.lokacija.ToLower())))
                                .Select(x => new KompanijePretragaResponse()
                                {
                                    Id = x.Id,
                                    Email = x.Email,
                                    Naziv = x.Naziv,
                                    Lokacija = x.Lokacija,
                                    GodinaOsnivanja = x.GodinaOsnivanja,
                                    //Slika = x.Logo,
                                }).ToListAsync();

            return new KompanijaPretragaResponse { Kompanije = kompanije };
        }
    }
}
