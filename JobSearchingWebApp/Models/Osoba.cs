using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Osobe")]
    public class Osoba
    {
        [Key]
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

        public Osoba()
        {

        }

        public Osoba(Osoba osoba)
        {
            Id = osoba.Id;
            Email = osoba.Email;
            Username = osoba.Username;
            Password = osoba.Password;
            TemaId = osoba.TemaId;
            JezikId = osoba.JezikId;
        }
    }
}
