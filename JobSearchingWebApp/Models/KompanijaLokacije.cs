using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    [Table("KompanijaLokacija")]
    public class KompanijaLokacija
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Kompanija))]
        public int KompanijaId { get; set; }
        public Kompanija Kompanija { get; set; }
        [ForeignKey(nameof(Lokacija))]
        public int LokacijaId { get; set; }
        public Lokacija Lokacija { get; set; }
    }
}
