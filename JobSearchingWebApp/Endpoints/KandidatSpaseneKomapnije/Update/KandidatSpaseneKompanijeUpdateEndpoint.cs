using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatSpaseniOglasi.Update;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.KandidatSpaseneKomapnije.Update
{
    [Tags("Kandidat-Spasene-Kompanije")]
    [Route("kandidat-spasene-kompanije-update")]
    public class KandidatSpaseneKompanijeUpdateEndpoint : MyBaseEndpoint<KandidatSpaseneKompanijeUpdateRequest, KandidatSpaseneKompanijeUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatSpaseneKompanijeUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPut]
        public override async Task<KandidatSpaseneKompanijeUpdateResponse> MyAction(KandidatSpaseneKompanijeUpdateRequest request, CancellationToken cancellationToken)
        {
            var spaseni = dbContext.KandidatSpaseneKompanije.Where(spaseni => spaseni.KandidatId == request.kandidat_id && spaseni.KompanijaId == request.kompanija_id).FirstOrDefault();

            if (spaseni == null)
            {
                throw new Exception("Nije pronađena kompanija sa ID " + request.kompanija_id);
            }

            spaseni.Spasen = false;

            await dbContext.SaveChangesAsync();

            return new KandidatSpaseneKompanijeUpdateResponse { id = spaseni.Id };
        }
    }
}
