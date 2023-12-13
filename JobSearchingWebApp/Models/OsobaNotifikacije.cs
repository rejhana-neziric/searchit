using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("OsobaNotifikacije")]
    public class OsobaNotifikacije
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Osoba))]
        public int OsobaId { get; set; }
        public Osoba Osoba { get; set; }
        [ForeignKey(nameof(Notifikacija))]
        public int NotifikacijaId { get; set; }
        public Notifikacija Notifikacija { get; set; }
        public DateTime DatumPrimanja { get; set; }
        public bool Pogledano { get; set; }
    }
}
