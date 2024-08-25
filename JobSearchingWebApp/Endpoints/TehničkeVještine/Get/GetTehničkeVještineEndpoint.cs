using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.TehničkeVještine.Get
{
    [Tags("TehničkeVještine")]
    [Route("tehnicke-vjestine-get")]
    public class GetTehničkeVještineEndpoint : MyBaseEndpoint<NoRequest, GetTehničkeVještineResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public GetTehničkeVještineEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<GetTehničkeVještineResponse> MyAction([FromQuery] NoRequest noRequest, CancellationToken cancellationToken)
        {
            var ranges = TehničkeVještineExtensions.GetAllEmployeeCountRanges();
            return new GetTehničkeVještineResponse() { lista = ranges };
        }
    }
}
