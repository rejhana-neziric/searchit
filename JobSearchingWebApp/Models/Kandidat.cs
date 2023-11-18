using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Kandidat:Osoba
    {
        [Key]
        public int OsobaId { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string MjestoPrebivalista { get; set; }
        public string Zvanje { get; set; }
        public string BrojTelefona { get; set; }
    }
}
