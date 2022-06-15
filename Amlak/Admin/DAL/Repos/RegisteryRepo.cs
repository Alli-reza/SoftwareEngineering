using AutoMapper;
using DAL.Infrastructure;
using DAL.Models;
using DAL.Services;
using DAL.ViewModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface IRegisteryRepo
    {
        Task<string> SignInAdmin(SignIn signIn);
        Task<AdminProfileVM> GetAdminProfile(string username);
        Task<int> UpdateAdminProfile(AdminProfileVM profile);
    }

    public class RegisteryRepo : IRegisteryRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public RegisteryRepo(
            IHttpContextAccessor httpContext,
            IConfiguration configur,
            AmlakDbContext context,
            IMapper mapper)
        {
            this._context = context;
            this._httpContext = httpContext;
            this._configur = configur;
            this.dataProvider = new();
            this._configur.Bind("Amlak", dataProvider);
            this._mapper = mapper;
        }

        public async Task<string> SignInAdmin(SignIn signIn)
        {
            try
            {
                string password = GenerateHashService
                    .EncryptData(signIn.Username, signIn.Password);

                AdminProfile adminProfile = await this._context.AdminProfile
                    .Where(w => !w.Deleted && w.Activate &&
                        w.Username == signIn.Username && w.Password == password)
                    .SingleOrDefaultAsync();

                if (adminProfile != null)
                {
                    SymmetricSecurityKey secretKey = new(
                        Encoding.UTF8.GetBytes(
                            this.dataProvider.System.SigningKey
                    ));
                    SigningCredentials signinCredentials = new(
                        secretKey,
                        SecurityAlgorithms.HmacSha256
                    );

                    List<Claim> claim = new()
                    {
                        new Claim("Username", adminProfile.Username ?? ""),
                        new Claim("FullName", adminProfile.FullName ?? ""),
                        new Claim("PhoneNumber", adminProfile.PhoneNumber ?? "")
                    };

                    ClaimsIdentity identity = new(
                        claim,
                        CookieAuthenticationDefaults.AuthenticationScheme);
                    ClaimsPrincipal principal = new(identity);

                    this._httpContext.HttpContext.User = principal;

                    JwtSecurityToken tokeOptions = new(
                            issuer: this.dataProvider.System.APIBaseURL,
                            audience: this.dataProvider.System.CMSBaseURL,
                            claims: claim,
                            expires: DateTime.UtcNow.AddMinutes(this.dataProvider.System.SessionTimeOut),
                            signingCredentials: signinCredentials
                        );

                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    AuthenticateResult.Success(
                        new AuthenticationTicket(
                            new ClaimsPrincipal(
                                new ClaimsIdentity(
                                    claim,
                                    "Username",
                                    "FullName",
                                    "PhoneNumber")),
                            JwtBearerDefaults.AuthenticationScheme
                    ));

                    return tokenString;
                }

                return string.Empty;
            }
            catch (Exception e)
            {
                return string.Empty;
            }
        }

        public async Task<AdminProfileVM> GetAdminProfile(string username)
        {
            try
            {
                AdminProfile profile = await this._context.AdminProfile
                    .Where(w => !w.Deleted && w.Username == username)
                    .SingleOrDefaultAsync();

                if (profile != null) profile.Password = string.Empty;

                return this._mapper.Map<AdminProfileVM>(profile);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<int> UpdateAdminProfile(AdminProfileVM profile)
        {
            try
            {
                AdminProfile oldProfile = await this._context.AdminProfile
                    .Where(w => !w.Deleted && w.Id == profile.Id)
                    .SingleOrDefaultAsync();

                if (oldProfile != null)
                {
                    if (!string.IsNullOrEmpty(profile.Password) &&
                        !string.IsNullOrEmpty(profile.ConfirmPassword) &&
                        !string.IsNullOrEmpty(profile.OldPassword))
                    {
                        oldProfile.FullName = profile.FullName;
                        oldProfile.PhoneNumber = profile.PhoneNumber;
                        oldProfile.Username = profile.Username;

                        if (profile.Password == profile.ConfirmPassword &&
                            oldProfile.Password == GenerateHashService
                                .EncryptData(profile.Username, profile.OldPassword))
                        {
                            profile.Password = GenerateHashService
                                .EncryptData(profile.Username, profile.Password);
                        }
                        else
                            return 0;
                    }
                    else
                        profile.Password = oldProfile.Password;

                    this._context.AdminProfile.Update(oldProfile);
                    return await this._context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
