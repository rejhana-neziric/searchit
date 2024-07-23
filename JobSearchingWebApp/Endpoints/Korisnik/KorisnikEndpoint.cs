using IdentityServer3.Core.Services;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Helper.Services;
using Microsoft.AspNetCore.Mvc;
using JobSearchingWebApp.Models;
namespace JobSearchingWebApp.Endpoints.Korisnik
{
    [Route("[controller]")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        private IKorisnikService _userService;

        public KorisnikController(IKorisnikService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistracijaRequest request)
        {
            return Ok(await _userService.Register(request));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] KorisnikUpdateRequest korisnik)
        {
            return Ok(await _userService.Update(id, korisnik));
        }
    }

}
