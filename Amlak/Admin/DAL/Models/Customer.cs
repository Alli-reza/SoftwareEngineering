using DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public int? MyEstateId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }

        [Column(TypeName = "nvarchar(12)")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Address { get; set; }
        public CustomerType CustomerType { get; set; }
        public ContractType ContractType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LatestUpdate { get; set; }
        public bool Activate { get; set; }
        public bool Deleted { get; set; }

        [ForeignKey("MyEstateId")]
        public virtual MyEstate MyEstate { get; set; }
        public virtual ICollection<Contract> Contract { get; set; }
    }
}
