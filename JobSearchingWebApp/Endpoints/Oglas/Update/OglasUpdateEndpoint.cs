using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Update;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.Update
{
    [Tags("Oglas")]
    [Route("oglas-update")]
    public class OglasUpdateEndpoint : MyBaseEndpoint<OglasUpdateRequest, OglasUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<OglasUpdateResponse> MyAction(OglasUpdateRequest request, CancellationToken cancellationToken)
        {
            var oglas = dbContext.Oglasi.FirstOrDefault(x => x.Id == request.oglas_id);

            if (oglas == null)
            {
                throw new Exception("Nije pronađen oglas sa ID " + request.oglas_id);
            }

            oglas.NazivPozicije = request?.naziv_pozicije;
            oglas.RokPrijave = request.rok_prijave ?? oglas.RokPrijave;
            oglas.DatumModificiranja = DateTime.Now;

            await dbContext.SaveChangesAsync();

            return new OglasUpdateResponse { Id = oglas.Id };
        }
    }
}
