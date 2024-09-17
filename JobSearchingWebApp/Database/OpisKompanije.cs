using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Database
{
    //za brisanje
    [Table("OpisiKompanija")]
    public class OpisKompanije
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string OpisPoslovanja { get; set; }

        [Required]
        public int BrojOtvorenihPozicija { get; set; }

        [Required]
        public int BrojZaposlenika { get; set; }
    }
}
