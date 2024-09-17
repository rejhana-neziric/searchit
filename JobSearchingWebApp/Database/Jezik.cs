using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Database
{
    [Table("Jezici")]
    public class Jezik
    {
        [Key]
        public int Id { get; set; }

        public string Naziv { get; set; }
    }
}
