using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Tehnologije")]
    public class Tehnologija
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
