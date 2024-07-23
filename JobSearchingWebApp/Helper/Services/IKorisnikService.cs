using JobSearchingWebApp.Endpoints.Korisnik;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Helper.Services
{
    public interface IKorisnikService
    {
        Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model);
        Task<AuthenticateResponse> Register([FromBody] RegistracijaRequest request);
        Task<IEnumerable<Models.Korisnik>> GetAll();
        Task<Models.Korisnik?> GetById(int id);
        Task<Models.Korisnik?> Update(int id, KorisnikUpdateRequest korisnik);
    }
}
