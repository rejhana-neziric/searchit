namespace JobSearchingWebApp.Endpoints.Oglas.Update
{
    public class OglasUpdateRequest
    {
        public int oglas_id { get; set; }
        public string? naziv_pozicije { get; set; }
        public DateTime? rok_prijave { get; set; }
    }
}
