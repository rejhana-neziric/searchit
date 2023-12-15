namespace JobSearchingWebApp.Endpoints.Tehnologija.Pretraga
{
    public class TehnologijaPretragaResponse
    {
        public List<TehnologijePretragaResponse> Tehnologije { get; set; }
    }

    public class TehnologijePretragaResponse
    {
        public string Naziv { get; set; }
    }
}
