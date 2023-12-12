namespace JobSearchingWebApp.Endpoints.Notifikacija.Pretraga
{
    public class NotifikacijaPretragaResponse
    {
        public List<NotifikacijePretragaResponse> Notifikacije { get; set; }
    }

    public class NotifikacijePretragaResponse
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Vrsta { get; set; }
    }
}
