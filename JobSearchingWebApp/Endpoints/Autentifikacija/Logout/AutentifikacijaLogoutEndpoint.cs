using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using JobSearchingWebApp.Database;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Autentifikacija.Logout
{
    [Tags("Autentifikacija")]
    [Route("auth-logout")]
    public class AutentifikacijaLogoutEndpoint : MyBaseEndpoint<NoRequest, NoResponse>
    {
        private readonly ApplicationDbContext applicationDbContext;
        private readonly MyAuthService authService;

        public AutentifikacijaLogoutEndpoint(ApplicationDbContext applicationDbContext, MyAuthService authService)
        {
            this.applicationDbContext = applicationDbContext;
            this.authService = authService;
        }

        [HttpPost()]
        public override async Task<NoResponse> MyAction ([FromBody] NoRequest request, CancellationToken cancellationToken)
        {
            AutentifikacijaToken? autentifikacijaToken = authService.GetAuthInfo().autentifikacijaToken;

            if (autentifikacijaToken == null)
                return new NoResponse();

            applicationDbContext.Remove(autentifikacijaToken);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return new NoResponse();
        }
    }
}
