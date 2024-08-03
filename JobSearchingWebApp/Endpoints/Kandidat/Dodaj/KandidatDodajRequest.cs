using JobSearchingWebApp.Endpoints.Auth;

namespace JobSearchingWebApp.Endpoints.Kandidat.Dodaj
{
    public class KandidatDodajRequest : IUserRegistrationRequest
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string MjestoPrebivalista { get; set; }
        public string Zvanje { get; set; }
        public string BrojTelefona { get; set; }
    }


    public class KandidatWrapper
    {
        public KandidatDodajRequest Kandidat { get; set; }
    }
}
