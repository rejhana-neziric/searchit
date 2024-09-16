namespace JobSearchingWebApp.Endpoints.Kandidat.Update
{
    public class KandidatUpdateRequest
    {
        public string Id { get; set; }

        public string? MjestoPrebivalista { get; set; }

        public string? Zvanje { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
