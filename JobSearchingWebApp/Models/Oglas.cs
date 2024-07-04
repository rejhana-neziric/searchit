using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("Oglasi")]
    public class Oglas
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Kompanija))]
        public int KompanijaId { get; set; }
        public Kompanija Kompanija { get; set; }
        public string NazivPozicije { get; set; }
        public DateTime DatumObjave { get; set; }
        public double Plata { get; set; }
        public string TipPosla { get; set; }
        public DateTime RokPrijave { get; set; }
        public DateTime? DatumModificiranja { get; set; }
        public virtual OpisOglas OpisOglas { get; set; }    
        public virtual ICollection<OglasLokacija> OglasLokacija { get; set; } = new List<OglasLokacija>();
        public virtual ICollection<OglasIskustvo> OglasIskustvo { get; set; } = new List<OglasIskustvo>();

    }
}
