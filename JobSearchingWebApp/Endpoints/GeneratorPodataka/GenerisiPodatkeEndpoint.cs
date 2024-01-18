using JobSearchingWebApp.Data;
using Microsoft.AspNetCore.Mvc;


namespace JobSearchingWebApp.Endpoints.GeneratorPodataka
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class GenerisiPodatkeEndpoint : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public GenerisiPodatkeEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public ActionResult Generisi()
        {
            var oglasi = new List<Models.Oglas>();
            var kompanije = new List<Models.Kompanija>();
            var jezici = new List<Models.Jezik>();
            var teme = new List<Models.Tema>();


            oglasi.Add(new Models.Oglas { NazivPozicije = "Software Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2000, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = 66});
            oglasi.Add(new Models.Oglas { NazivPozicije = "DevOps Engineer", Lokacija = "Jablanica", DatumObjave = DateTime.Now, Plata = 3400, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Senior", OpisPosla = "opis.....", KompanijaId = 67 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "QA Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2500, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Medior", OpisPosla = "opis.....", KompanijaId = 68 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "Software Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2300, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = 69 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "ML Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 4000, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Senior", OpisPosla = "opis.....", KompanijaId = 66 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "UI/UX Designer", Lokacija = "Mostar", DatumObjave = DateTime.Now, Plata = 1000, TipPosla = "Part Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = 67 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "Backend Developer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2600, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = 68 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "Frontend Developer", Lokacija = "Tuzla", DatumObjave = DateTime.Now, Plata = 2300, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = 69 });
            oglasi.Add(new Models.Oglas { NazivPozicije = "Graphical Designer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 1800, TipPosla = "Part Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Medior", OpisPosla = "opis.....", KompanijaId = 66 });


            kompanije.Add(new Models.Kompanija { Naziv = "ByteMatrix Solutions", GodinaOsnivanja = 2012, Lokacija="Sarajevo", Slika = "slika...", Email = "ByteMatrix.Solutions@gmail.com", Username = "bytematrix", Password = "bytematrix", TemaId = 1, JezikId = 1});
            kompanije.Add(new Models.Kompanija { Naziv = "TechVista Dynamics", GodinaOsnivanja = 2016, Lokacija = "Mostar", Slika = "slika...", Email = "TechVista Dynamics@gmail.com", Username = "techvista", Password = "techvista", TemaId = 1, JezikId = 1 });
            kompanije.Add(new Models.Kompanija { Naziv = "CloudMesh", GodinaOsnivanja = 2010, Lokacija = "Jablanica", Slika = "slika...", Email = "CloudMesh@gmail.com", Username = "cloudmesh", Password = "cloudmesh", TemaId = 1, JezikId = 1 });
            kompanije.Add(new Models.Kompanija { Naziv = "Insightify", GodinaOsnivanja = 2021, Lokacija = "Tuzla", Slika = "slika...", Email = "Insightify@gmail.com", Username = "insightify", Password = "insightify", TemaId = 1, JezikId = 1 });


            jezici.Add(new Models.Jezik { Naziv = "Bosanski jezik" });
            jezici.Add(new Models.Jezik { Naziv = "Engleski jezik" });
            jezici.Add(new Models.Jezik { Naziv = "Arapski jezik" });

            teme.Add(new Models.Tema { Vrsta = "tema1" });
            teme.Add(new Models.Tema { Vrsta = "tema2" });

            dbContext.AddRange(oglasi);
            dbContext.AddRange(kompanije);
            dbContext.AddRange(jezici);
            dbContext.AddRange(teme);
            dbContext.SaveChanges();    

            return Ok();
        }
    }
}
