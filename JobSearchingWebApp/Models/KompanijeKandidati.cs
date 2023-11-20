using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class KompanijeKandidati
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Kompanija))]
        public int KompanijaId { get; set; }
        public Kompanija Kompanija { get; set; }
        [ForeignKey(nameof(Kandidat))]
        public int KandidatId { get; set; }
        public Kandidat Kandidat { get; set; }
        public DateTime DatumRazgovora { get; set; }
    }
}
