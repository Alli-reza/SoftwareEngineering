using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class AmlakDbContext : DbContext
    {
        public AmlakDbContext(DbContextOptions<AmlakDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AdminProfile> AdminProfile { get; set; }
        public virtual DbSet<MyEstate> MyEstate { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Contract> Contract { get; set; }
        public virtual DbSet<Estate> Estate { get; set; }
        public virtual DbSet<EstateAsset> EstateAsset { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("");
            }
        }
    }
}
