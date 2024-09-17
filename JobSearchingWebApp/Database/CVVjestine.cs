using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Database
{
    //za brisanje
    [Table("CVVjestine")]
    public class CVVjestine
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Vjestina))]
        public int VjestinaId { get; set; }

        public Vjestina Vjestina { get; set; }

        [ForeignKey(nameof(CV))]
        public int CVId { get; set; }

        public CV CV { get; set; }
    }
}
