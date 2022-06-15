using DAL.Repos;
using DAL.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class EstateController : Controller
    {
        private readonly IEstateRepo _estateRepo;
        private readonly IHttpContextAccessor _httpContext;

        public EstateController(
            IEstateRepo estateRepo,
           IHttpContextAccessor httpContext)
        {
            this._estateRepo = estateRepo;
            this._httpContext = httpContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllEstateForListView()
        {
            IEnumerable<EstateListView> estates = await this._estateRepo.GetAllEstateForListView();

            return Json(estates);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllEstates(
            [FromQuery] int skip,
            [FromQuery] int take,
            [FromQuery] int pageNumber,
            [FromQuery] string searchWord
            )
        {
            EstateCollection result = await this._estateRepo
                .GetAllEstates(new EstateCollection()
                {
                    Skip = skip,
                    Take = take,
                    PageNumber = pageNumber,
                    SearchWord = searchWord
                });

            return Json(result);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetEstateById(int id)
        {
            EstateVM result = await this._estateRepo.GetEstateById(id);

            return Json(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddEstate([FromBody] EstateVM estate)
        {
            int result = await this._estateRepo.AddEstate(estate);

            return Json(result);
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateEstate([FromBody] EstateVM estate)
        {
            int result = await this._estateRepo.UpdateEstate(estate);

            return Json(result);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> DeleteEstate(int id)
        {
            bool result = await this._estateRepo.DeleteEstate(id);

            return Json(result);
        }
    }
}
