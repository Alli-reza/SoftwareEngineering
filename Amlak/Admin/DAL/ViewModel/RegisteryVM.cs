namespace DAL.ViewModel
{
    public class AdminProfileVM
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string OldPassword { get; set; }
        public string PhoneNumber { get; set; }
        public bool Activated { get; set; }
    }

    public class SignIn
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
