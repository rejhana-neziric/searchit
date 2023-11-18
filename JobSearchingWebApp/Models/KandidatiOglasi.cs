using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class KandidatiOglasi
    {
        [Key]
        public int KandidatId { get; set; }
        [Key]
        public int OglasId { get; set; }
        public DateTime DatumPrijave { get; set; }
        public string Status { get; set; }
    }
}
