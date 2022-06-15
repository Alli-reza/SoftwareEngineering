using DAL.Models;
using DAL.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : Controller
    {
        private readonly IReportsRepo _reportsRepo;
        private readonly IHttpContextAccessor _httpContext;

        public ReportController(
            IReportsRepo reportsRepo,
            IHttpContextAccessor httpContext)
        {
            this._reportsRepo = reportsRepo;
            this._httpContext = httpContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetLast10CustomersReport()
        {
            IEnumerable<Last10Customer> result = await this._reportsRepo
                .GetLast10CustomersReport();

            return Json(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> EntityCounters()
        {
            EntityCounters result = await this._reportsRepo
                .EntityCounters();

            return Json(result);
        }
    }
}
