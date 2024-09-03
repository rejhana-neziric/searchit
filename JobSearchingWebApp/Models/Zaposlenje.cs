using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Zaposlenje
    {
        [Key]
        public int Id { get; set; }

        public string NazivKompanije { get; set; }

        public string NazivPozicije { get; set; }

        public DateOnly DatumPocetka { get; set; }

        public DateOnly? DatumZavrsetka { get; set; }

        public string? Opis { get; set; }

        public ICollection<CVZaposlenje> CVs { get; set; }
    }
}
