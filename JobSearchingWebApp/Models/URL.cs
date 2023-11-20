using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class URL
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(CV))]
        public int CVId { get; set; }
        public CV CV { get; set; }
        public string Url { get; set; }
    }
}
