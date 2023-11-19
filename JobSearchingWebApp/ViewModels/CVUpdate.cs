using System.Drawing;

namespace JobSearchingWebApp.ViewModels
{
    public class CVUpdate
    {
        public int id { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string email { get; set; }
        public string broj_telefona { get; set; }
        public string opis_profila { get; set; }
        public string slika { get; set; }   
    }
}
