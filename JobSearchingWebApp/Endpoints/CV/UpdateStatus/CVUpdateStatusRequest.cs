namespace JobSearchingWebApp.Endpoints.CV.UpdateStatus
{
    public class CVUpdateStatusRequest
    {
        public int Id { get; set; }

        public string KandidatId { get; set; }

        public bool Objavljen { get; set; }
    }
}
