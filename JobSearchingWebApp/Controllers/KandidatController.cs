using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class KandidatController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{Id}")]
        public ActionResult Get(int id)
        {
            return Ok(dbContext.Kandidati.FirstOrDefault(k => k.Id == id)); 
        }

        [HttpGet]
        public List<Kandidat> GetAll() 
        {
            var rezultat = dbContext.Kandidati.AsQueryable(); 
            return rezultat.ToList();   
        }

        [HttpPost]
        public ActionResult Snimi([FromBody] KandidatSpremiVM k)
        {
            Kandidat? kandidat; 

            if(k.id == 0)
            {
                kandidat = new Kandidat();
                dbContext.Add(kandidat); 
            }
            else
            {
                kandidat = dbContext.Kandidati.FirstOrDefault(x => x.Id == k.id);
                if (kandidat == null)
                    return BadRequest("Pogresan id"); 
            }

            kandidat.Ime = k.ime;
            kandidat.Prezime = k.prezime;
            kandidat.MjestoPrebivalista = k.mjesto_prebivalista;
            kandidat.DatumRodjenja = k.datum_rodjenja;
            kandidat.BrojTelefona = k.broj_telefona; 

            dbContext.SaveChanges();
            return Ok(kandidat);    
        }

        [HttpPut]
        public ActionResult Update([FromBody] KandidatSpremiVM k)
        {
            var kandidat = dbContext.Kandidati.Where(x => x.Id == k.id).FirstOrDefault();

            if (kandidat == null) 
                return new NotFoundResult();

            kandidat.Ime = k.ime;
            kandidat.Prezime = k.prezime;
            kandidat.MjestoPrebivalista = k.mjesto_prebivalista;
            kandidat.DatumRodjenja = k.datum_rodjenja;
            kandidat.BrojTelefona = k.broj_telefona;

            dbContext.SaveChanges();
            return Ok(kandidat);    
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete (int id)
        {
            Kandidat? kandidat = dbContext.Kandidati.Find(id);

            if (kandidat == null || id == 1)
                return BadRequest("Pogresan id!"); 

            dbContext.Remove(kandidat);

            dbContext.SaveChanges();
            return Ok(kandidat);    
        }
    }
}
