using DAL.Enums;
using System.Collections.Generic;

namespace DAL.ViewModel
{
    public class CustomerVM
    {
        public int Id { get; set; }
        public int? MyEstateId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public CustomerType CustomerType { get; set; }
        public ContractType ContractType { get; set; }
        public string CreatedDate { get; set; }
        public string LatestUpdate { get; set; }
        public bool Activate { get; set; }

        public IEnumerable<ContractVM> Contracts { get; set; }
    }

    public class CustomerCollection : PageCollection
    {
        public IEnumerable<CustomerVM> Customers { get; set; }
    }

    public class CustomerViewList
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
