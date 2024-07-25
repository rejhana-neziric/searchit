namespace JobSearchingWebApp.Helper
{
    public interface ITokenGenerator
    {
        Task<string> GenerateJwtToken(Models.Korisnik korisnik);
    }
}
