using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class CV
    {
        [Key]
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Email { get; set; }
        public string BrojTelefona { get; set; }
        public string OpisProfila { get; set; }
        public string Slika { get; set; }
    }
}
