using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Database
{
    [Table("KompanijaLokacija")]
    public class KompanijaLokacija
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Kompanija))]
        public string KompanijaId { get; set; }

        public Kompanija Kompanija { get; set; }

        [ForeignKey(nameof(Lokacija))]
        public int LokacijaId { get; set; }

        public Lokacija Lokacija { get; set; }
    }
}
