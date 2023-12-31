using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace JobSearchingWebApp.Models
{
    [Table("Korisnici")]
    public class Korisnik
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

        //[JsonIgnore]
        //public Kandidat? Kandidat => this as Kandidat;
        //[JsonIgnore]
        //public Kompanija? Kompanija => this as Kompanija;

        //public bool isKandidat => Kandidat != null;
        //public bool isKompanija => Kompanija != null;

        public bool isKandidat { get; set; }
        public bool isKompanija { get; set; }

        public Korisnik()
        {

        }

        public Korisnik(Korisnik korisnik)
        {
            Id = korisnik.Id;
            Email = korisnik.Email;
            Username = korisnik.Username;
            Password = korisnik.Password;
            TemaId = korisnik.TemaId;
            JezikId = korisnik.JezikId;
            isKandidat = korisnik.isKandidat;
            isKompanija = korisnik.isKompanija;
        }
    }
}
