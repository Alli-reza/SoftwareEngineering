namespace DAL.Infrastructure
{
    public class DataProvider
    {
        public CORS CORS { get; set; } = new CORS();
        public System System { get; set; } = new System();
    }

    public class CORS
    {
        public string AllowedDomains { get; set; }
    }

    public class System
    {
        public string Domain { get; set; }
        public string IonicLiveChatManagement { get; set; }
        public string APIAdminURL { get; set; }
        public string APIBaseURL { get; set; }
        public string CMSBaseURL { get; set; }
        public string UserPanel { get; set; }
        public int SessionTimeOut { get; set; }
        public string SigningKey { get; set; }
    }
}
