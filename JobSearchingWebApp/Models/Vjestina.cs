using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Vjestine")]
    public class Vjestina
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
