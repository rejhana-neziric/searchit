using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Vjestina
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
