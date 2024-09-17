using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.StatusPrijave.Get
{
    [Tags("StatusPrijave")]
    [Route("status-prijave-get")]
    public class GetStatusPrijaveEndpoint : MyBaseEndpoint<NoRequest, GetStatusPrijaveResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public GetStatusPrijaveEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<GetStatusPrijaveResponse> MyAction([FromQuery] NoRequest noRequest, CancellationToken cancellationToken)
        {
            var lista = StatusPrijaveExtensions.GetAllStatusPrijave();
            return new GetStatusPrijaveResponse() { lista = lista };
        }
    }
}
