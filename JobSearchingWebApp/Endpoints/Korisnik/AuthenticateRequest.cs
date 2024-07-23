using System.ComponentModel;

namespace JobSearchingWebApp.Endpoints.Korisnik
{
    public class AuthenticateRequest
    {
        [DefaultValue("System")]
        public required string Username { get; set; }

        [DefaultValue("System")]
        public required string Password { get; set; }
    }
}
