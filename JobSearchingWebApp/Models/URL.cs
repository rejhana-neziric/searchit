using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class URL
    {
        [Key]
        public int Id { get; set; }
        public int CVId { get; set; }
        public string Url { get; set; }
    }
}
