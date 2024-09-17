using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using JobSearchingWebApp.Database;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace JobSearchingWebApp.Endpoints.Autentifikacija.Get
{
    [Tags("Autentifikacija")]
    [Route("auth-get")]
    public class AutentifikacijaGetEndpoint : MyBaseEndpoint<NoRequest, MyAuthInfo>
    {
        private readonly ApplicationDbContext applicationDbContext;
        private readonly MyAuthService authService;

        public AutentifikacijaGetEndpoint(ApplicationDbContext applicationDbContext, MyAuthService authService)
        {
            this.applicationDbContext = applicationDbContext;
            this.authService = authService;
        }

        [HttpPost()]
        public override async Task<MyAuthInfo> MyAction([FromBody] NoRequest request, CancellationToken cancellationToken)
        {
            AutentifikacijaToken? autentifikacijaToken = authService.GetAuthInfo().autentifikacijaToken;

            return new MyAuthInfo(autentifikacijaToken);
        }
    }
}
