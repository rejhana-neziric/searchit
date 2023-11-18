using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class KompanijeKandidati
    {
        [Key]
        public int KompanijaId { get; set; }
        [Key]
        public int KandidatId { get; set; }
        public DateTime DatumRazgovora { get; set; }
    }
}
