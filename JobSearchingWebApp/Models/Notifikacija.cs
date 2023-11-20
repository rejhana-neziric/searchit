using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Notifikacije")]
    public class Notifikacija
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Vrsta { get; set; }
    }
}
