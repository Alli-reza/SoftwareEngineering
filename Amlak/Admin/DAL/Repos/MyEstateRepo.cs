using AutoMapper;
using DAL.Infrastructure;
using DAL.Models;
using DAL.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface IMyEstateRepo
    {
        Task<MyEstateVM> GetMyEstate();
        Task<int> UpdateMyEstate(MyEstateVM myEstate);
    }

    public class MyEstateRepo : IMyEstateRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public MyEstateRepo(
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

        public async Task<MyEstateVM> GetMyEstate()
        {
            try
            {
                MyEstate myEstate = await this._context.MyEstate
                    .SingleOrDefaultAsync();

                return this._mapper.Map<MyEstateVM>(myEstate);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<int> UpdateMyEstate(MyEstateVM myEstate)
        {
            try
            {
                MyEstate oldEstate = await this._context.MyEstate
                    .SingleOrDefaultAsync();

                if (oldEstate != null)
                {
                    oldEstate.Address = myEstate.Address;
                    oldEstate.Brand = myEstate.Brand;
                    oldEstate.Description = myEstate.Description;
                    oldEstate.EstateName = myEstate.EstateName;
                    oldEstate.LatestUpdate = DateTime.Now;
                    oldEstate.LogoURL = myEstate.LogoURL;
                    oldEstate.ManagerName = myEstate.ManagerName;
                    oldEstate.SiteURL = myEstate.SiteURL;
                    oldEstate.Telephone = myEstate.Telephone;

                    this._context.MyEstate.Update(oldEstate);
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
