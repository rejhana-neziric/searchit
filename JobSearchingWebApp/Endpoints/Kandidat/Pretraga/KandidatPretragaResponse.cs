namespace JobSearchingWebApp.Endpoints.Kandidat.Pretraga
{
    public class KandidatPretragaResponse
    {
        public List<KandidatiPretragaResponse> Kandidati { get; set; }
    }

    public class KandidatiPretragaResponse
    {
        public string Id { get; set; } 
        public string Email { get; set; }
        public string Username { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string MjestoPrebivalista { get; set; }
        public string Zvanje { get; set; }
        public string BrojTelefona { get; set; }
    }
}
