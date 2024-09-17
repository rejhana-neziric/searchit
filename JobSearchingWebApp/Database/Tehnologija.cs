using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Database
{
    //za brisanje
    [Table("Tehnologije")]
    public class Tehnologija
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
    }
}
