using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Models
{
    public class CV
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Ime { get; set; }

        [Required]
        public string Prezime { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [RegularExpression(@"\+\d{1,3}-\d{3}-\d{3,4}", ErrorMessage = "Phone number must be in the format +XXX-XXX-XXX or +XXX-XXX-XXXX.")]
        public string? BrojTelefona { get; set; }

        public string? Drzava { get; set; }

        public string? Grad { get; set; }

        public string? ProfesionalniSazetak { get; set; }

        public List<string>? Vještine { get; set; }

        public List<string>? TehničkeVještine { get; set; }

        public List<string>? Kursevi { get; set; }

        public ICollection<CVEdukacija> Edukacije { get; set; }

        public ICollection<CVZaposlenje> Zaposlenja { get; set; }

        public ICollection<CVURL> URLovi { get; set; }
    }
}
