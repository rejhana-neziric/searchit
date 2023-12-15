namespace JobSearchingWebApp.Endpoints.Jezik.Pretraga
{
    public class JezikPretragaResponse
    {
        public List<JeziciPretragaResponse> Jezici { get; set; }
    }

    public class JeziciPretragaResponse
    {
        public string Naziv { get; set; }
    }
}
