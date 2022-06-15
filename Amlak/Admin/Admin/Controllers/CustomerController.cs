using DAL.Repos;
using DAL.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    //[Authorize(Policy = "CorsPolicy")]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IHttpContextAccessor _httpContext;

        public CustomerController(
            ICustomerRepo customerRepo,
            IHttpContextAccessor httpContext)
        {
            this._customerRepo = customerRepo;
            this._httpContext = httpContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllCustomersForListView()
        {
            IEnumerable<CustomerViewList> result = await this._customerRepo.GetAllCustomersForListView();

            return Json(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllCutomers(
            [FromQuery] int skip,
            [FromQuery] int take,
            [FromQuery] int pageNumber,
            [FromQuery] string searchWord
            )
        {
            CustomerCollection result = await this._customerRepo
                .GetAllCutomers(new CustomerCollection()
            {
                Skip = skip,
                Take = take,
                SearchWord = searchWord,
                PageNumber = pageNumber
            });

            return Json(result);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            CustomerVM result = await this._customerRepo.GetCustomerById(id);

            return Json(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddCustomer([FromBody] CustomerVM customer)
        {
            int result = await this._customerRepo.AddCustomer(customer);

            return Json(result);
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateCustomer([FromBody] CustomerVM customer)
        {
            int result = await this._customerRepo.UpdateCustomer(customer);

            return Json(result);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            bool result = await this._customerRepo.DeleteCustomer(id);

            return Json(result);
        }
    }
}
