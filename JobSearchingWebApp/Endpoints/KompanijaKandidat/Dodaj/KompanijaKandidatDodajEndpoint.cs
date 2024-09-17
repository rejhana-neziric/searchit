using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Dodaj;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Dodaj
{
    [Tags("Kompanija-Kandidat")]
    [Route("kompanija-kandidat-dodaj")]
    public class KompanijaKandidatDodajEndpoint : MyBaseEndpoint<KompanijaKandidatDodajRequest, KompanijaKandidatDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaKandidatDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]

        public override async Task<KompanijaKandidatDodajResponse> MyAction(KompanijaKandidatDodajRequest request, CancellationToken cancellationToken)
        {
            var kompanija_kandidat = new Database.KompanijeKandidati()
            {
                KompanijaId = request.kompanija_id,
                KandidatId = request.kandidat_id,
                DatumRazgovora = request.datum_razgovora,    
            };

            dbContext.KompanijeKandidati.Add(kompanija_kandidat);
            await dbContext.SaveChangesAsync();

            return new KompanijaKandidatDodajResponse { Id = kompanija_kandidat.Id };
        }
    }
}
