using DAL.Repos;
using DAL.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class MyEstateController : Controller
    {
        private readonly IMyEstateRepo _myEstateRepo;
        private readonly IHttpContextAccessor _httpContext;

        public MyEstateController(
            IMyEstateRepo myEstateRepo,
            IHttpContextAccessor httpContext)
        {
            this._myEstateRepo = myEstateRepo;
            this._httpContext = httpContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetMyEstate()
        {
            MyEstateVM myEstate = await this._myEstateRepo.GetMyEstate();

            return Json(myEstate);
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateMyEstate([FromBody] MyEstateVM myEstate)
        {
            int result = await this._myEstateRepo.UpdateMyEstate(myEstate);

            return Json(result);
        }
    }
}
