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
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        //[ForeignKey(nameof(Tema))]
        //public int TemaId { get; set; }
        //public Tema Tema { get; set; }
        //[ForeignKey(nameof(Jezik))]
        //public int JezikId { get; set; }
        //public Jezik Jezik { get; set; }
        public int UlogaId { get; set; }
        public virtual Uloga Uloga { get; set; }

        //[JsonIgnore]
        //public Kandidat? Kandidat => this as Kandidat;
        //[JsonIgnore]
        //public Kompanija? Kompanija => this as Kompanija;

        //public bool isKandidat => Kandidat != null;
        //public bool isKompanija => Kompanija != null;

        public Korisnik()
        {

        }

        public Korisnik(Korisnik korisnik)
        {
            Id = korisnik.Id;
            Email = korisnik.Email;
            Username = korisnik.Username;
            //Password = korisnik.Password;
            //TemaId = korisnik.TemaId;
           // JezikId = korisnik.JezikId;
            UlogaId = korisnik.UlogaId;
        }
    }
}
