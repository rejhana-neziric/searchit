using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.Delete
{
    [Route("oglas-delete")]
    public class OglasDeleteEndpoint : MyBaseEndpoint<OglasDeleteRequest, OglasDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<OglasDeleteResponse> MyAction([FromQuery]OglasDeleteRequest request)
        {
            var oglas = dbContext.Oglasi.FirstOrDefault(x => x.Id == request.oglas_id);

            if (oglas == null)
            {
                throw new Exception("Nije pronađen oglas sa ID " + request.oglas_id);
            }

            dbContext.Remove(oglas);
            await dbContext.SaveChangesAsync();

            return new OglasDeleteResponse() { };
        }
    }
}
