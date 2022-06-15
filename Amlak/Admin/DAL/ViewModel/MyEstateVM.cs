using System.Collections.Generic;

namespace DAL.ViewModel
{
    public class MyEstateVM
    {
        public int Id { get; set; }
        public string EstateName { get; set; }
        public string ManagerName { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string LogoURL { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }
        public string SiteURL { get; set; }

        public IEnumerable<CustomerVM> Customers { get; set; }
        public IEnumerable<ContractVM> Contracts { get; set; }
    } 
}
