using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.Korisnik
{
    public class RegistracijaRequest
    {

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public int UlogaId { get; set; }
    }
}
