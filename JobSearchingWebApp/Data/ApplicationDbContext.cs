using JobSearchingWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Osoba> Osobe { get; set; }
        public DbSet<Kompanija> Kompanije { get; set; }
        public DbSet<Kandidat> Kandidati { get; set; }
        public DbSet<Oglas> Oglasi { get; set; }
        public DbSet<Notifikacija> Notifikacije { get; set; }
        public DbSet<CV> CV { get; set; }
        public DbSet<KandidatiOglasi> KandidatiOglasi { get; set; }
        public DbSet<KompanijeKandidati> KompanijeKandidati { get; set; }
        public DbSet<OsobaNotifikacije> OsobaNotifikacije { get; set; }

        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}
