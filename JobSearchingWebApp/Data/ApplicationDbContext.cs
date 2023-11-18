using JobSearchingWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Osoba> Osobe { get; set; }
        public DbSet<Kompanija> Kompanije { get; set; }

        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}
