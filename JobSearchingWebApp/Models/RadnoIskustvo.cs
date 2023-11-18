using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class RadnoIskustvo
    {
        [Key]
        public int Id { get; set; }
        public string NazivPozicija { get; set; }
        public DateTime DatumPocetka { get; set; }
        public DateTime DatumZavrsetka { get; set; }
        public string NazivKompanije { get; set; }
        public string Opis { get; set; }
        public int CVId { get; set; }
    }
}
