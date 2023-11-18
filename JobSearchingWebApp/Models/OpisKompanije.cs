using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class OpisKompanije
    {
        [Key]
        public int Id { get; set; }
        public string OpisPoslovanja { get; set; }
        public int BrojOtvorenihPozicija { get; set; }
        public int BrojZaposlenika { get; set; }
    }
}
