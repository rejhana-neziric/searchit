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
        public string KompanijaId { get; set; }
        public Kompanija Kompanija { get; set; }
        public string NazivPozicije { get; set; }
        public DateTime DatumObjave { get; set; }
        public string Plata { get; set; }
        public string TipPosla { get; set; }
        public DateTime RokPrijave { get; set; }
        public DateTime? DatumModificiranja { get; set; }
        public bool Otvoren => RokPrijave > DateTime.Now;
        public bool? Objavljen { get; set; }
        public bool IsObrisan { get; set; } = false;
        public virtual OpisOglas OpisOglas { get; set; }    
        public virtual ICollection<OglasLokacija> OglasLokacija { get; set; } = new List<OglasLokacija>();
        public virtual ICollection<OglasIskustvo> OglasIskustvo { get; set; } = new List<OglasIskustvo>();
        public virtual ICollection<KandidatSpaseniOglasi> KandidatSpaseniOglasi { get; set; } = new List<KandidatSpaseniOglasi>();
    }
}
