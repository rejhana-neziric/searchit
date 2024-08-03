using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    [Table("AutentifikacijaToken")]
    public class AutentifikacijaToken
    {
        [Key]
        public int Id { get; set; }
        public string Vrijednost { get; set; }
        [ForeignKey(nameof(Korisnik))]
        public string KorisnikId { get; set; }
        public Korisnik Korisnik { get; set; }
        public DateTime VrijemeEvidentiranja { get; set; }
        public string? IPAdresa { get; set; }
    }
}
