using DAL;
using DAL.Infrastructure;
using DAL.Repos;
using DAL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace Admin
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            DataProvider dataProvider = new();
            Configuration.Bind("Amlak", dataProvider);
            services.AddSingleton(dataProvider);
            services.AddDbContextPool<AmlakDbContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("DB"))
            );

            services.AddScoped<IRegisteryRepo, RegisteryRepo>();
            services.AddScoped<IMyEstateRepo, MyEstateRepo>();
            services.AddScoped<ICustomerRepo, CustomerRepo>();
            services.AddScoped<IContractRepo, ContractRepo>();
            services.AddScoped<IEstateRepo, EstateRepo>();
            services.AddScoped<IEstateAssetRepo, EstateAssetRepo>();
            services.AddScoped<IReportsRepo, ReportsRepo>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddControllers().AddJsonOptions(x =>
            {
                x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                x.JsonSerializerOptions.WriteIndented = true;
            });

            services.AddOptions();
            services.AddSingleton(Configuration);
            services.AddSingleton(_ => Configuration);
            services.AddHttpContextAccessor();

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(3);
                options.Cookie.HttpOnly = false;
                options.Cookie.IsEssential = true;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
            });

            IdentityModelEventSource.ShowPII = true;

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
             {
                 options.SaveToken = true;
                 options.RequireHttpsMetadata = false;
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     //Server
                     ValidateIssuer = true,
                     // Angular
                     ValidateAudience = true,
                     // Expiration date
                     ValidateLifetime = false,
                     RequireExpirationTime = false,
                     // ValidateIssuerSigningKey = true,
                     ValidIssuer = dataProvider.System.APIAdminURL,
                     //ValidAudience = dataProvider.System.CMSBaseURL,

                     ValidAudiences = new List<string>
                     {
                         dataProvider.System.CMSBaseURL,
                         dataProvider.System.UserPanel
                     },

                     IssuerSigningKey = new SymmetricSecurityKey(
                         Encoding.UTF8.GetBytes(dataProvider.System.SigningKey))
                 };
                 services.AddCors();
             });

            services.AddAuthorization(config =>
            {
                config.AddPolicy("CorsPolicy", new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireRole("CorsPolicy")
                    .Build());
            });

            services.AddMvc(options =>
            {

                options.Filters.Add(
                    new AuthorizeFilter(
                        new AuthorizationPolicyBuilder().RequireAuthenticatedUser()
                        .Build()));
                //options.EnableEndpointRouting = false;

            }).SetCompatibilityVersion(CompatibilityVersion.Latest);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Error");
            }

            //app.UseMvc();
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    var dt = DateTime.Now;
                    dt = dt.AddDays(365);
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + 31536000;
                    ctx.Context.Response.Headers[HeaderNames.Expires] = dt.ToShortDateString();
                }
            });

            app.UseStatusCodePages();
            app.UseRouting();

            app.UseCors(policy => policy.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:700", "http://45.82.139.102:666"));

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
