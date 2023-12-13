using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Pretraga
{
    [Route("kompanija-kandidat-pretraga")]
    public class KompanijaKandidatPretragaEndpoint : MyBaseEndpoint<KompanijaKandidatPretragaRequest, KompanijaKandidatPretragaResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaKandidatPretragaEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<KompanijaKandidatPretragaResponse> MyAction([FromQuery]KompanijaKandidatPretragaRequest request)
        {
            var kompanija_kandidat = await dbContext
                                .KompanijeKandidati
                                .Where(x => (request.kandidat_id == null || x.KandidatId == request.kandidat_id)
                                         && (request.kompanija_id == null || x.KompanijaId == request.kompanija_id)
                                         && (request.datum_razgovora == null || x.DatumRazgovora == request.datum_razgovora))
                                .Select(x => new KompanijeKandidatiPretragaResponse()
                                {
                                    KandidatId = x.KandidatId,
                                    KompanijaId = x.KompanijaId,
                                    DatumRazgovora = x.DatumRazgovora,  
                                }).ToListAsync();

            return new KompanijaKandidatPretragaResponse { KompanijeKandidati = kompanija_kandidat };
        }
    }
}
