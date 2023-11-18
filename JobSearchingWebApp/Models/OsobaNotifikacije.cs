using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class OsobaNotifikacije
    {
        [Key]
        public int OsobaId { get; set; }
        [Key]
        public int NotifikacijaId { get; set; }
        public DateTime DatumPrimanja { get; set; }
        public bool Pogledano { get; set; }
    }
}
