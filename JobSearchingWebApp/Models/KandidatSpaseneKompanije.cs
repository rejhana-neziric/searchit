using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    [Table("KandidatSpaseneKompanije")]
    public class KandidatSpaseneKompanije
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Kandidat))]
        public int KandidatId { get; set; }
        public Kandidat Kandidat { get; set; }
        [ForeignKey(nameof(Kompanija))]
        public int KompanijaId { get; set; }
        public Kompanija Kompanija { get; set; }
        public bool Spasen { get; set; }
    }
}
