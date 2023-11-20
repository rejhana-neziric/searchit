using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class KandidatiOglasi
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Kandidat))]
        public int KandidatId { get; set; }
        public Kandidat Kandidat { get; set; }
        [ForeignKey(nameof(Oglas))]
        public int OglasId { get; set; }
        public Oglas Oglas { get; set; }
        public DateTime DatumPrijave { get; set; }
        public string Status { get; set; }
    }
}
