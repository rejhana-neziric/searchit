using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Iskustvo")]
    public class Iskustvo
    {
        [Key]
        public int Id { get; set; }

        public string Naziv { get; set; }

        public virtual ICollection<OglasIskustvo> OglasIskustvo { get; set; } = new List<OglasIskustvo>();
    }
}
