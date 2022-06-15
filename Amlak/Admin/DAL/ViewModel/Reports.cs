namespace DAL.Models
{
    public class Last10Customer
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string CreatedDate { get; set; }
        public long SellingPrice { get; set; }
        public long LoanAmount { get; set; }
        public long MortgageAmount { get; set; }
        public long AmountBeforePay { get; set; }
        public int SizeOfBuilding { get; set; }
        public string Address { get; set; }
    }

    public class EntityCounters
    {
        public int CountAllCustomers { get; set; }
        public int CountAllContracts { get; set; }
        public int CountAllEstate { get; set; }
    }
}
