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
        public string KandidatId { get; set; }
        public virtual Kandidat Kandidat { get; set; }

        [ForeignKey(nameof(Kompanija))]
        public string KompanijaId { get; set; }
        public virtual Kompanija Kompanija { get; set; }

        public bool Spasen { get; set; }
    }
}
