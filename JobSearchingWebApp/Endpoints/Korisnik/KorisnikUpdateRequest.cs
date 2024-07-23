namespace JobSearchingWebApp.Endpoints.Korisnik
{
    public class KorisnikUpdateRequest
    {
        public string Username { get; set; }
        public string? Password { get; set; }
        public string? PasswordPotvrda { get; set; }
    }
}
