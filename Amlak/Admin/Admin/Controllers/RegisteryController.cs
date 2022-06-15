using DAL.Repos;
using DAL.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteryController : Controller
    {
        private readonly IRegisteryRepo _registeryRepo;
        private readonly IHttpContextAccessor _httpContext;

        public RegisteryController(
            IRegisteryRepo registeryRepo,
            IHttpContextAccessor httpContext)
        {
            this._registeryRepo = registeryRepo;
            this._httpContext = httpContext;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SignInAdmin([FromBody] SignIn signIn)
        {
            if (signIn != null && !string.IsNullOrEmpty(signIn.Password.Trim())
                && !string.IsNullOrEmpty(signIn.Username.Trim()) &&
                signIn.Password.Length >= 8 && signIn.Password.Length <= 50 &&
                signIn.Username.Length >= 4 && signIn.Username.Length <= 50)
            {
                var result = await this._registeryRepo.SignInAdmin(signIn);

                if (!string.IsNullOrEmpty(result))
                {
                    CookieOptions options = new()
                    {
                        SameSite = SameSiteMode.Lax,
                        Expires = DateTime.Now.AddDays(1),
                        HttpOnly = false,
                        Secure = false
                    };

                    this._httpContext.HttpContext.Response
                        .Cookies.Append("CMS_AMLK_Token", result, options);

                    return Json(result);
                }
            }

            return Json(string.Empty);
        }
    }
}
