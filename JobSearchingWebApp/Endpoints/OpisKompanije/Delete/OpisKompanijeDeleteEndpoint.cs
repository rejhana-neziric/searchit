using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.OpisKompanije.Delete
{
    [Tags("OpisKomanije")]
    [Route("opis-kompanije-delete")]
    public class OpisKompanijeDeleteEndpoint : MyBaseEndpoint<OpisKompanijeDeleteRequest, OpisKompanijeDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OpisKompanijeDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpDelete]
        public override async Task<OpisKompanijeDeleteResponse> MyAction([FromQuery] OpisKompanijeDeleteRequest request, CancellationToken cancellationToken)
        {
            var opis_kompanije = dbContext.OpisiKompanija.FirstOrDefault(x => x.Id == request.opis_kompanije_id);

            if (opis_kompanije == null)
            {
                throw new Exception("Nije pronađen opis kompanije sa ID " + request.opis_kompanije_id);
            }

            dbContext.Remove(opis_kompanije);
            await dbContext.SaveChangesAsync();

            return new OpisKompanijeDeleteResponse() { };
        }
    }
}
