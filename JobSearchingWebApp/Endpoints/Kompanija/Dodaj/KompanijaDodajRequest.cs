using JobSearchingWebApp.Endpoints.Auth;
using JobSearchingWebApp.Models;

namespace JobSearchingWebApp.Endpoints.Kompanija.Dodaj
{
    public class KompanijaDodajRequest : IUserRegistrationRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Naziv { get; set; }
        public int GodinaOsnivanja { get; set; }
        public string Lokacija { get; set; }
        public string? Logo { get; set; }
        public string BrojZaposlenih { get; set; }
        public string KratkiOpis { get; set; }
        public string Opis { get; set; }
        public string? Website { get; set; }
        public string? LinkedIn { get; set; }
        public string? Twitter { get; set; }
    }
}
