namespace JobSearchingWebApp.Endpoints.CV.Update
{
    public class CVUpdateRequest
    {
        public int cv_id { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string email { get; set; }
        public string broj_telefona { get; set; }
        public string opis_profila { get; set; }
        public string slika { get; set; }
    }
}
