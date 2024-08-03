using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace JobSearchingWebApp.Models
{
    [Table("Korisnici")]
    public class Korisnik : IdentityUser
    {
        public string PasswordSalt { get; set; }
        public int UlogaId { get; set; }
        public virtual Uloga Uloga { get; set; }
    }
}
