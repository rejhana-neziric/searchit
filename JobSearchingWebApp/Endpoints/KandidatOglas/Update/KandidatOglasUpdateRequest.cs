namespace JobSearchingWebApp.Endpoints.KandidatOglas.Update
{
    public class KandidatOglasUpdateRequest
    {
        public int Id { get; set; }

        public string KandidatId { get; set; }

        public string KompanijaId { get; set; }

        public string? Status { get; set; }

        public bool? Spasen { get; set; }
    }
}
