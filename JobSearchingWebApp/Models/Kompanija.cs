using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class Kompanija
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public int GodinaOsnivanja { get; set; }
        public string Lokacija { get; set; }
        public byte[] Slika { get; set; }
    }
}
