using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class MyEstate
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string EstateName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string ManagerName { get; set; }

        [Column(TypeName = "nvarchar(2000)")]
        public string Description { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Brand { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string LogoURL { get; set; }

        [Column(TypeName = "nvarchar(12)")]
        public string Telephone { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Address { get; set; }

        [Column(TypeName = "nvarchar(2000)")]
        public string SiteURL { get; set; }
        public DateTime? LatestUpdate { get; set; }

        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Contract> Contract { get; set; }
    }
}