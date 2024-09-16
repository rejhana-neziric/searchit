namespace JobSearchingWebApp.Endpoints.CV.Pretraga
{
    public class CVPretragaResponse
    {
        public List<CVLista> CVLista { get; set; } 
    }

    public class CVLista
    {
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string OpisProfila { get; set; }
        public string Slika { get; set; }
    }
}
