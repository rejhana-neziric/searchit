using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatOglas.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Delete
{
    [Route("kompanija-kandidat-delete")]
    public class KompanijaKandidatDeleteEndpoint : MyBaseEndpoint<KompanijaKandidatDeleteRequest, KompanijaKandidatDeleteReponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaKandidatDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<KompanijaKandidatDeleteReponse> MyAction([FromQuery]KompanijaKandidatDeleteRequest request)
        {
            var kompanija_kandidat = dbContext.KompanijeKandidati.FirstOrDefault(x => x.Id == request.kompanija_kandidat_id);

            if (kompanija_kandidat == null)
            {
                throw new Exception("Nije pronađen kompanija_kandidat sa ID " + request.kompanija_kandidat_id);
            }

            dbContext.Remove(kompanija_kandidat);
            await dbContext.SaveChangesAsync();

            return new KompanijaKandidatDeleteReponse() { };
        }
    }
}
