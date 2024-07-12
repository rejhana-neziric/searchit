using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    [Table("KandidatSpaseniOglasi")]
    public class KandidatSpaseniOglasi
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Kandidat))]
        public int KandidatId { get; set; }
        public Kandidat Kandidat { get; set; }
        [ForeignKey(nameof(Oglas))]
        public int OglasId { get; set; }
        public Oglas Oglas { get; set; }
        public bool Spasen { get; set; }
    }
}
