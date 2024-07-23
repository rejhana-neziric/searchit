using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Korisnik;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JobSearchingWebApp.Helper.Services
{
    public class KorisnikService : IKorisnikService
    {
        private readonly AppSettings appSettings;
        private readonly ApplicationDbContext dbContext;
        public IMapper mapper { get; }

        public KorisnikService(IOptions<AppSettings> appSettings, ApplicationDbContext dbContext, IMapper mapper)
        {
            this.appSettings = appSettings.Value;
            this.dbContext = dbContext;
            this.mapper = mapper;   
        }

        public async Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model)
        {

            var korisnik = await dbContext.Korisnici.Where(x => x.Username == model.Username).FirstOrDefaultAsync();

            // return null if user not found
            if (korisnik == null) return null;

            var hash = HelperMethods.GenerateHash(korisnik.PasswordSalt, model.Password);

            // return null if password is not correct
            if (hash != korisnik.PasswordHash) return null;
           
            // authentication successful so generate jwt token
            var token = await generateJwtToken(korisnik);

            return new AuthenticateResponse(korisnik, token);
        }

        public async Task<AuthenticateResponse> Register([FromBody] RegistracijaRequest request)
        {
            var korisnik = mapper.Map<Models.Korisnik>(request);
            korisnik.PasswordSalt = HelperMethods.GenerateSalt();
            korisnik.PasswordHash = HelperMethods.GenerateHash(korisnik.PasswordSalt, request.Password);

            await dbContext.Korisnici.AddAsync(korisnik); 
            await dbContext.SaveChangesAsync();

            var token = await generateJwtToken(korisnik);

            return new AuthenticateResponse(korisnik, token);
        }


        public async Task<IEnumerable<Korisnik>> GetAll()
        {
            return await dbContext.Korisnici.ToListAsync();
        }

        public async Task<Korisnik?> GetById(int id)
        {
            return await dbContext.Korisnici.Include(x => x.Uloga).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Korisnik?> Update(int id, KorisnikUpdateRequest korisnik)
        {
            bool isSuccess = false;

            isSuccess = await dbContext.SaveChangesAsync() > 0;
   
            var noviKorisnik = mapper.Map<Models.Korisnik>(korisnik);
            noviKorisnik.PasswordSalt = HelperMethods.GenerateSalt();
            noviKorisnik.PasswordHash = HelperMethods.GenerateHash(noviKorisnik.PasswordSalt, korisnik.Password); 
            await dbContext.Korisnici.AddAsync(noviKorisnik);
            isSuccess = await dbContext.SaveChangesAsync() > 0;
       
            var response = mapper.Map<Models.Korisnik>(korisnik); 

            return isSuccess ? response : null;
        }

        // helper methods
        private async Task<string> generateJwtToken(Korisnik korisnik)
        {
            //Generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = await Task.Run(() =>
            {

                var key = Encoding.ASCII.GetBytes(appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("id", korisnik.Id.ToString()) }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                return tokenHandler.CreateToken(tokenDescriptor);
            });

            return tokenHandler.WriteToken(token);
        }
    }
}
