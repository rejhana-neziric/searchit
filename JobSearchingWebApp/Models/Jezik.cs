using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Jezik
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
