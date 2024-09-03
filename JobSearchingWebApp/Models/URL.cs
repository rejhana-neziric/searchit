using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class URL
    {
        [Key]
        public int Id { get; set; }

        public string Naziv { get; set; }

        public string Putanja { get; set; }

        public ICollection<CVURL> CVs { get; set; }
    }
}
