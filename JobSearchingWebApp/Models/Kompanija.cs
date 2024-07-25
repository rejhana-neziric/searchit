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
        public string? Logo { get; set; }
        public string BrojZaposlenih { get; set; }
        public string KratkiOpis { get; set; }
        public string Opis { get; set; }
        public string? Website { get; set; }
        public string? LinkedIn { get; set; }
        public string? Twitter { get; set; }
        public virtual ICollection<KompanijaLokacija> KompanijaLokacija { get; set; } = new List<KompanijaLokacija>();
        public virtual ICollection<Oglas> Oglasi { get; set; } = new List<Oglas>();
        public virtual ICollection<KandidatSpaseneKompanije> KandidatSpaseneKompanije { get; set; } = new List<KandidatSpaseneKompanije>();
    }
}
