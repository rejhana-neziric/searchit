namespace JobSearchingWebApp.Endpoints.Recenzije.Pretraga
{
    public class RecenzijePretragaRequest
    {
        public string? tekst { get; set; }
        public int? brojZvijezdica { get; set; }
        public string? korisnik_id { get; set; }
        public string? pozicija { get; set; }
    }
}
