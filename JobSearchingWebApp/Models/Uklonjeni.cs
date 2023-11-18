using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Uklonjeni
    {
        [Key]
        public int OznakaId { get; set; }
        [Key]
        public int UklonjeniId { get; set; }
        public DateTime DatumUklanjanja { get; set; }
        public string Razlog { get; set; }
    }
}
