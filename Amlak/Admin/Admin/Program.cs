using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Admin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            //.UseEnvironment("Production")
            //.UseEnvironment("Development")
            .UseEnvironment("Local")
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
