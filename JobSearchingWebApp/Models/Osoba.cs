using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Osobe")]
    public class Osoba
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        [ForeignKey(nameof(Tema))]
        public int TemaId { get; set; }
        public Tema Tema { get; set; }
        [ForeignKey(nameof(Jezik))]
        public int JezikId { get; set; }
        public Jezik Jezik { get; set; }
    }
}
