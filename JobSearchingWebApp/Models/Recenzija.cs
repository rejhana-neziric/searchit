using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Recenzije")]
    public class Recenzija
    {
        [Key]
        public int Id { get; set; }
        public string Tekst { get; set; }
        [ForeignKey(nameof(Korisnik))]
        public string KorisnikId { get; set; }
        public Korisnik Korisnik { get; set; }
        public int BrojZvijezdica { get; set; }
        public DateTime DatumVrijemeRecenzije { get; set; }
        public string Pozicija { get; set; }
    }
}
