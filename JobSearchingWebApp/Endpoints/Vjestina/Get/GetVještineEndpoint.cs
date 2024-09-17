using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kompanija.GetBrojZaposlenihRange;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Vjestina.Get
{
    [Tags("Vještine")]
    [Route("vjestine-get")]
    public class GetVještineEndpoint : MyBaseEndpoint<NoRequest, GetVještineResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public GetVještineEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<GetVještineResponse> MyAction([FromQuery] NoRequest noRequest, CancellationToken cancellationToken)
        {
            var ranges = VještineExtensions.GetAllVještine();
            return new GetVještineResponse() { lista = ranges };
        }
    }
}
