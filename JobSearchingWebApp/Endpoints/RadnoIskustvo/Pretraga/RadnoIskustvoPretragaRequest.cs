namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Pretraga
{
    public class RadnoIskustvoPretragaRequest
    {
        public string? naziv_pozicije { get; set; }
        public string? naziv_kompanije { get; set; }
        public int? cv_id { get; set; }
    }
}
