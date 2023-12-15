using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    [Table("OpisiKompanija")]
    public class OpisKompanije
    {
        [Key]
        public int Id { get; set; }
        public string OpisPoslovanja { get; set; }
        public int BrojOtvorenihPozicija { get; set; }
        public int BrojZaposlenika { get; set; }
    }
}
