using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Database
{
    //za brisanje
    [Table("RadnoIskustvo")]
    public class RadnoIskustvo
    {
        [Key]
        public int Id { get; set; }
        public string NazivPozicija { get; set; }
        public DateTime DatumPocetka { get; set; }
        public DateTime DatumZavrsetka { get; set; }
        public string NazivKompanije { get; set; }
        public string Opis { get; set; }
        [ForeignKey(nameof(CV))]
        public int CVId { get; set; }
        public CV CV { get; set; }
    }
}
