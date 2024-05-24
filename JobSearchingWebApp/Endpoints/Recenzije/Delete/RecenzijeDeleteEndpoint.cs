using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Recenzije.Delete
{
    [Tags("Recenzije")]
    [Microsoft.AspNetCore.Mvc.Route("recenzije-delete")]
    public class RecenzijeDeleteEndpoint : MyBaseEndpoint<RecenzijeDeleteEndpointRequest, RecenzijeDeleteEndpointResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        public RecenzijeDeleteEndpoint(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpDelete]
        public override Task<RecenzijeDeleteEndpointResponse> MyAction([FromQuery]RecenzijeDeleteEndpointRequest request, CancellationToken cancellationToken)
        {
            var recenzija = _dbContext.Recenzije.FirstOrDefault(x=> x.Id==request.recenzija_id);
            if (recenzija==null)
            {
                throw new Exception("Nije pronadjenja recenzija sa ID-jem: " + request.recenzija_id);
            }
            _dbContext.Remove(recenzija);
            _dbContext.SaveChangesAsync();

            return Task.FromResult(new RecenzijeDeleteEndpointResponse());
        }
    }
}
