using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class CVTehnologije
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(CV))]
        public int CVId { get; set; }
        public CV CV { get; set; }
        [ForeignKey(nameof(Tehnologija))]
        public int TehnologijaId { get; set; }
        public Tehnologija Tehnologija { get; set; }
    }
}
