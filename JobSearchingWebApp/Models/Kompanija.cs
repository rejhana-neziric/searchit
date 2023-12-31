using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Kompanije")]
    public class Kompanija : Korisnik
    {
        public string Naziv { get; set; }
        public int GodinaOsnivanja { get; set; }
        public string Lokacija { get; set; }
        public string Slika { get; set; }

        //ovo je tu samo privremeno zbog starih kontrolera, treba ga izbrisati
        public Kompanija() { }

        public Kompanija(Korisnik korisnik) : base(korisnik)
        {

        }
    }
}
