using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Kandidati")]
    public class Kandidat : Korisnik
    {
        public string Ime { get; set; }

        public string Prezime { get; set; }

        public DateTime DatumRodjenja { get; set; }

        public string MjestoPrebivalista { get; set; }

        public string Zvanje { get; set; }

        public string BrojTelefona { get; set; }
    }
}
