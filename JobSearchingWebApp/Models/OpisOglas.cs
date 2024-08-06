using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("OpisOglas")]
    public class OpisOglas
    {
        [Key]
        public int Id { get; set; }
        public string OpisPozicije { get; set; }
        public int? MinimumGodinaIskustva { get; set; }
        public int? PrefiraneGodineIskstva { get; set; }
        public string? Kvalifikacija { get; set; }
        public string? Vjestine { get; set; }
        public string? Benefiti { get; set; }
        [ForeignKey(nameof(Oglas))]
        public int OglasId { get; set; }
        public Oglas Oglas { get; set; }
    }
}
