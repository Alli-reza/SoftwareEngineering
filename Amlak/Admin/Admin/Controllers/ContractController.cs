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
    public class ContractController : Controller
    {
        private readonly IContractRepo _contractRepo;
        private readonly IHttpContextAccessor _httpContext;

        public ContractController(
            IContractRepo contractRepo,
            IHttpContextAccessor httpContext)
        {
            this._contractRepo = contractRepo;
            this._httpContext = httpContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllContracts(
            [FromQuery] int skip,
            [FromQuery] int take,
            [FromQuery] int pageNumber,
            [FromQuery] string searchWord
            )
        {
            ContractCollection result = await this._contractRepo
                .GetAllContracts(new ContractCollection()
                {
                    Skip = skip,
                    Take = take,
                    PageNumber = pageNumber,
                    SearchWord = searchWord
                });

            return Json(result);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetContractById(int id)
        {
            ContractVM result = await this._contractRepo.GetContractById(id);

            return Json(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddContract([FromBody] ContractVM contract)
        {
            int result = await this._contractRepo.AddContract(contract);

            return Json(result);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {
            bool result = await this._contractRepo.DeleteContract(id);

            return Json(result);
        }
    }
}
