using DAL.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Contract
    {
        [Key]
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public int? MyEstateId { get; set; }
        public int? EstateId { get; set; }
        public DocumentType DocumentType { get; set; }
        public long SellingPrice { get; set; }
        public long LoanAmount { get; set; }
        public long MortgageAmount { get; set; }
        public long AmountBeforePay { get; set; }
        public DateTime? ExpirationTime { get; set; }
        public int NumberOfPeople { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LatestUpdate { get; set; }
        public bool Activate { get; set; }
        public bool Deleted { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        [ForeignKey("MyEstateId")]
        public virtual MyEstate MyEstate { get; set; }

        [ForeignKey("EstateId")]
        public virtual Estate Estate { get; set; }
    }
}
