namespace DAL.ViewModel
{
    public class PageCollection
    {
        public int Skip { get; set; }
        public int Take { get; set; }
        public int PageNumber { get; set; }
        public int Counts { get; set; }
        public string SearchWord { get; set; }
    }
}
