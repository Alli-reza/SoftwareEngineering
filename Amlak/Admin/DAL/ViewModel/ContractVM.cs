using DAL.Enums;
using System.Collections.Generic;

namespace DAL.ViewModel
{
    public class ContractVM
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public int? MyEstateId { get; set; }
        public int? EstateId { get; set; }
        public string CustomerName { get; set; }
        public DocumentType DocumentType { get; set; }
        public long SellingPrice { get; set; }
        public long LoanAmount { get; set; }
        public long MortgageAmount { get; set; }
        public long AmountBeforePay { get; set; }
        public string ExpirationTime { get; set; }
        public int NumberOfPeople { get; set; }
        public string CreatedDate { get; set; }
        public string LatestUpdate { get; set; }
        public bool Activate { get; set; }

        public CustomerVM Customer { get; set; }
    }

    public class ContractCollection : PageCollection
    {
        public IEnumerable<ContractVM> Contracts { get; set; }
    }
}
