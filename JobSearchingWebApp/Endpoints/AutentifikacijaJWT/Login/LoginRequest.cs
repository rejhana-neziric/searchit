using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.AutentifikacijaJWT.Login
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
