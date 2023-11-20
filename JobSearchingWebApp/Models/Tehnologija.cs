using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Tehnologija
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
