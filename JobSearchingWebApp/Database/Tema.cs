using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Database
{
    //za brisanje
    public class Tema
    {
        [Key]
        public int Id { get; set; }
        public string Vrsta { get; set; }
    }
}
