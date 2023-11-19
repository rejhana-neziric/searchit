using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Notifikacije")]
    public class Notifikacija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Vrsta { get; set; }
    }
}
