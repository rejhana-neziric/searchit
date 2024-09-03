using JobSearchingWebApp.Models;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.CV.Dodaj
{
    public class CVDodajRequest
    {
        [Required]
        public string KandidatId { get; set; }

        [Required]
        public string Naziv { get; set; }

        [Required]
        public bool Objavljen { get; set; }

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

        public List<string>? Vjestine { get; set; }

        public List<string>? TehnickeVjestine { get; set; }

        public List<string>? Kursevi { get; set; }

        public List<EdukacijaRequest>? Edukacija { get; set; }

        public List<ZaposlenjeRequest>? Zasposlenje { get; set; }

        public List<URLRequest>? URL { get; set; }
    }

    public class EdukacijaRequest
    {
        [Required]
        public string NazivSkole { get; set; }

        public DateOnly? DatumPocetka { get; set; }

        public DateOnly? DatumZavrsetka { get; set; }

        public string? Grad { get; set; }

        public string? Opis { get; set; }
    }

    public class ZaposlenjeRequest
    {
        [Required]
        public string NazivKompanije { get; set; }

        [Required]
        public string NazivPozicije { get; set; }

        [Required]
        public DateOnly DatumPocetka { get; set; }

        public DateOnly? DatumZavrsetka { get; set; }

        public string? Opis { get; set; }
    }

    public class URLRequest
    {
        [Required]
        public string Naziv { get; set; }

        [Required]
        [Url]
        public string Putanja { get; set; }
    }
}
