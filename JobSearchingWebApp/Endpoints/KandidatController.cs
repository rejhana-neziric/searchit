//using JobSearchingWebApp.Data;
//using JobSearchingWebApp.Endpoints;
//using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
//using JobSearchingWebApp.Endpoints.Kandidat.Update;
//using JobSearchingWebApp.Models;
//using JobSearchingWebApp.ViewModels;
//using MapsterMapper;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Conventions;

//namespace JobSearchingWebApp.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class KandidatController : ControllerBase
//    {
//        private readonly ApplicationDbContext dbContext;
//        public IMapper Mapper; 

//        public KandidatController(ApplicationDbContext dbContext, IMapper mapper)
//        {
//            this.dbContext = dbContext;
//            Mapper = mapper;
//        }

//        [HttpGet("{id}")]
//        public Korisnik GetById(int id)
//        {
//            var entity = dbContext.Korisnici.Find(id);

//            if (entity != null)
//            {
//                return entity;
//            }

//            else
//            {
//                return null; 
//            }

//            //return Ok(dbContext.Kandidati.FirstOrDefault(k => k.Id == id));
//        }

//        //ovdje dodati search object 
//        [HttpGet]
//        public List<Kandidat> GetAll()
//        {
//            List<Kandidat> list = new List<Kandidat> ();    

//            var query = dbContext.Kandidati.AsQueryable();

//            //dodati sad za filtriranje 

//            list = query.ToList();

//            PagedResult<Kandidat> pagedResult = new PagedResult<Kandidat>(); 

//            pagedResult.Count = list.Count;
//            pagedResult.ResultList = list;



//            return pagedResult; 
//        }

//        [HttpPost]
//        public ActionResult Insert(KandidatDodajRequest request)
//        {
//            var id = dbContext.Osobe.Where(x => x.Id == k.id).Select(x => x.Id);

//            if (id == null)
//                return BadRequest("Pogresan id");

//            Kandidat? kandidat = dbContext.Kandidati.FirstOrDefault(x => x.Id == k.id);

//            if (kandidat == null)

//            {
//                kandidat = new Kandidat();
//                dbContext.Add(kandidat);
//                kandidat.Id = k.id;
//            }

//            kandidat.Ime = k.ime;
//            kandidat.Prezime = k.prezime;
//            kandidat.MjestoPrebivalista = k.mjesto_prebivalista;
//            kandidat.DatumRodjenja = k.datum_rodjenja;
//            kandidat.PhoneNumber = k.broj_telefona;

//            dbContext.SaveChanges();
//            return Ok(kandidat);
//        }

//        [HttpPut("{id}")]
//        public ActionResult Update(int id, KandidatUpdateRequest request)
//        {
//            var id = dbContext.Osobe.Where(x => x.Id == k.id).Select(x => x.Id);

//            if (id == null)
//                return BadRequest("Pogresan id");

//            var kandidat = dbContext.Kandidati.Where(x => x.Id == k.id).FirstOrDefault();

//            if (kandidat == null)
//                return new NotFoundResult();

//            kandidat.Ime = k.ime;
//            kandidat.Prezime = k.prezime;
//            kandidat.MjestoPrebivalista = k.mjesto_prebivalista;
//            kandidat.DatumRodjenja = k.datum_rodjenja;
//            kandidat.PhoneNumber = k.broj_telefona;

//            dbContext.SaveChanges();
//            return Ok(kandidat);
//        }

//        [HttpDelete]
//        public ActionResult Delete(int id)
//        {
//            var _id = dbContext.Osobe.Where(x => x.Id == id).Select(x => x.Id);
//            Kandidat? kandidat = dbContext.Kandidati.Find(id);

//            if (_id == null || kandidat == null)
//                return BadRequest("Pogresan id");

//            dbContext.Remove(kandidat);

//            dbContext.SaveChanges();
//            return Ok(kandidat);
//        }
//    }
//}
