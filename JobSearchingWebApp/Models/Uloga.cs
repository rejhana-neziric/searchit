using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class Uloga
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
