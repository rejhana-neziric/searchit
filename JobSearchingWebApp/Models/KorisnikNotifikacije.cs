using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("KorisnikNotifikacije")]
    public class KorisnikNotifikacije
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Korisnik))]
        public string KorisnikId { get; set; }
        public Korisnik Korisnik { get; set; }
        [ForeignKey(nameof(Notifikacija))]
        public int NotifikacijaId { get; set; }
        public Notifikacija Notifikacija { get; set; }
        public DateTime DatumPrimanja { get; set; }
        public bool Pogledano { get; set; }
    }
}
