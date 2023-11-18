using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class CVJezici
    {
        [Key]
        public int CVId { get; set; }
        [Key]
        public int JezikId { get; set; }
    }
}
