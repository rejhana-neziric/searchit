namespace JobSearchingWebApp.Database
{
    public class Poruka
    {
        public int Id { get; set; }
        public string KorisnikId { get; set; }
        public string Sadrzaj { get; set; }
        public DateTime VrijemeSlanja { get; set; }
    }
}
