using AutoMapper;
using DAL.Infrastructure;
using DAL.Models;
using DAL.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface IEstateRepo
    {
        Task<IEnumerable<EstateListView>> GetAllEstateForListView();
        Task<EstateCollection> GetAllEstates(EstateCollection pageCollection);
        Task<EstateVM> GetEstateById(int id);
        Task<int> AddEstate(EstateVM estate);
        Task<int> UpdateEstate(EstateVM estate);
        Task<bool> DeleteEstate(int id);
    }

    public class EstateRepo : IEstateRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public EstateRepo(
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

        public async Task<IEnumerable<EstateListView>> GetAllEstateForListView()
        {
            try
            {
                IEnumerable<EstateListView> estates = await this._context.Estate
                    .Where(w => !w.Deleted && w.Activate)
                    .Select(s => new EstateListView() 
                    {
                        Id = s.Id,
                        Description = s.Description
                    })
                    .OrderBy(o => o.Description)
                    .ToListAsync();

                return estates;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<EstateCollection> GetAllEstates(EstateCollection pageCollection)
        {
            try
            {
                IEnumerable<Estate> items;

                items = await this._context.Estate
                    .Where(w => !w.Deleted)
                    .Include(i => i.Contract)
                    .OrderByDescending(o => o.CreatedDate)
                    .Skip(pageCollection.Skip)
                    .Take(pageCollection.Take)
                    .ToListAsync();

                if (items != null && items.Any())
                {
                    pageCollection.Estates = this._mapper
                        .Map<IEnumerable<EstateVM>>(items);

                    if (pageCollection.Counts < 1)
                    {
                        pageCollection.Counts = await this._context.Estate
                            .Where(w => !w.Deleted)
                            .CountAsync();
                    }

                    pageCollection.SearchWord = string.Empty;
                }

                return pageCollection;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    
        public async Task<EstateVM> GetEstateById(int id)
        {
            try
            {
                Estate estate = await this._context.Estate
                    .Where(w => !w.Deleted && w.Id == id)
                    .Include(i => i.EstateAssets)
                    .SingleOrDefaultAsync();

                return this._mapper.Map<EstateVM>(estate);
            }
            catch (Exception e)
            {
                return null;
            }
        }
    
        public async Task<int> AddEstate(EstateVM estate)
        {
            try
            {
                Estate newEstate = this._mapper.Map<Estate>(estate);

                newEstate.Deleted = false;
                newEstate.CreatedDate = DateTime.Now;

                await this._context.Estate.AddAsync(newEstate);
                await this._context.SaveChangesAsync();

                return newEstate.Id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    
        public async Task<int> UpdateEstate(EstateVM estate)
        {
            try
            {
                Estate oldEstate = await this._context.Estate
                    .Where(w => !w.Deleted && w.Id == estate.Id)
                    .SingleOrDefaultAsync();
                this._context.Entry(oldEstate).State = EntityState.Detached;

                if (oldEstate != null)
                {
                    oldEstate = this._mapper.Map<Estate>(estate);

                    oldEstate.LatestUpdate = DateTime.Now;
                    oldEstate.Deleted = false;

                    this._context.Estate.Update(oldEstate);
                    return await this._context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    
        public async Task<bool> DeleteEstate(int id)
        {
            try
            {
                Estate estate = await this._context.Estate
                    .Where(w => !w.Deleted && w.Id == id)
                    .SingleOrDefaultAsync();

                if (estate != null)
                {
                    estate.Deleted = false;

                    this._context.Estate.Update(estate);
                    await this._context.SaveChangesAsync();

                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
