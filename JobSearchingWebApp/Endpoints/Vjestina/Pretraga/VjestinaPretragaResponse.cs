namespace JobSearchingWebApp.Endpoints.Vjestina.Pretraga
{
    public class VjestinaPretragaResponse
    {
        public List<VjestinePretragaResponse> Vjestine { get; set; }
    }

    public class VjestinePretragaResponse
    {
        public string Naziv { get; set; }
    }
}
