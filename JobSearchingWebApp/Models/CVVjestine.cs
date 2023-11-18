using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class CVVjestine
    {
        [Key]
        public int VjestinaId { get; set; }
        [Key]
        public int CVId { get; set; }
    }
}
