namespace JobSearchingWebApp.Endpoints.Recenzije.Pretraga
{
    public class RecenzijePretragaResponse
    {
        public List<RecenzijaPretragaResponse> Recenzije { get; set; }
    }

    public class RecenzijaPretragaResponse
    {
        public string Tekst { get; set; }
        public DateTime DatumVrijemeRecenzije { get; set; }
        public int BrojZvijezdica { get; set; }
        public string KorisnikId { get; set; }
        public string Pozicija { get; set; }
    }
}
