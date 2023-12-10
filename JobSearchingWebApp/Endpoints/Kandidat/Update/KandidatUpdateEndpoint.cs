using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Kandidat.Update
{
    [Route("kandidat-update")]
    public class KandidatUpdateEndpoint : MyBaseEndpoint<KandidatUpdateRequest, KandidatUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatUpdateResponse> MyAction(KandidatUpdateRequest request)
        {
            var kandidat = dbContext.Kandidati.FirstOrDefault(x => x.Id == request.kandidat_id); 

            if (kandidat == null) 
            {
                throw new Exception("Nije pronađen kandidat sa ID " + request.kandidat_id); 
            }

            kandidat.Email = request.email; 
            kandidat.Username = request.username;   
            kandidat.Password = request.password;   
            kandidat.TemaId = request.tema_id;  
            kandidat.JezikId = request.jezik_id;    
            kandidat.Ime = request.ime; 
            kandidat.Prezime = request.prezime;
            kandidat.DatumRodjenja = request.datum_rodjenja;
            kandidat.MjestoPrebivalista = request.mjesto_prebivalista; 
            kandidat.Zvanje = request.zvanje;
            kandidat.BrojTelefona = request.broj_telefona; 

            await dbContext.SaveChangesAsync();

            return new KandidatUpdateResponse { id = kandidat.Id }; 
        }
    }
}
