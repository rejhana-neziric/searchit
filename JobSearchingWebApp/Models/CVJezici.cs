using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class CVJezici
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(CV))]
        public int CVId { get; set; }
        public CV CV { get; set; }
        [ForeignKey(nameof(Jezik))]
        public int JezikId { get; set; }
        public Jezik JezikS { get; set; }
    }
}
