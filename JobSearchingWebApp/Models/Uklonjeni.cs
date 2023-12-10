using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class Uklonjeni
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Oznaka))]
        public int OznakaId { get; set; }
        public Oznaka Oznaka { get; set; }
        //[ForeignKey(nameof(Uklonjeni))]
        //public int UklonjeniId { get; set; }
        //public Uklonjeni Uklonjeni { get; set; }
        public DateTime DatumUklanjanja { get; set; }
        public string Razlog { get; set; }
    }
}
