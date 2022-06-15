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
    public class EstateAssetController : Controller
    {
        private readonly IEstateAssetRepo _estateAssetRepo;
        private readonly IHttpContextAccessor _httpContext;

        public EstateAssetController(
            IEstateAssetRepo estateAssetRepo,
            IHttpContextAccessor httpContext)
        {
            this._estateAssetRepo = estateAssetRepo;
            this._httpContext = httpContext;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddEstateAsset([FromForm] EstateAssetVM asset)
        {
            int result = await this._estateAssetRepo.AddEstateAsset(asset);

            return Json(result);
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateEstateAsset([FromForm] EstateAssetVM asset)
        {
            int result = await this._estateAssetRepo.UpdateEstateAsset(asset);

            return Json(result);
        }
    }
}
