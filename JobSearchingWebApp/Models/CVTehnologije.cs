using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class CVTehnologije
    {
        [Key]
        public int CVId { get; set; }
        [Key]
        public int TehnologijaId { get; set; }
    }
}
