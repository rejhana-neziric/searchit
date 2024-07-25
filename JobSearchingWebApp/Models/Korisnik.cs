using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace JobSearchingWebApp.Models
{
    [Table("Korisnici")]
    public class Korisnik
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public int UlogaId { get; set; }
        public virtual Uloga Uloga { get; set; }
    }
}
