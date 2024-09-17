using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Database
{
    [Table("Vjestine")]
    public class Vjestina
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Naziv { get; set; }
    }
}
