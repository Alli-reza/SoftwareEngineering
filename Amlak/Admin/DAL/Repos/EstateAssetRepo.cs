using AutoMapper;
using DAL.Enums;
using DAL.Infrastructure;
using DAL.Models;
using DAL.Services;
using DAL.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public interface IEstateAssetRepo
    {
        Task<int> AddEstateAsset(EstateAssetVM asset);
        Task<int> UpdateEstateAsset(EstateAssetVM asset);
    }

    public class EstateAssetRepo : IEstateAssetRepo
    {
        private readonly AmlakDbContext _context;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configur;
        private readonly DataProvider dataProvider;
        private readonly IMapper _mapper;

        public EstateAssetRepo(
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

        public async Task<int> AddEstateAsset(EstateAssetVM asset)
        {
            try
            {
                asset.RouteURL = await FileService.UploadFileStream(
                    asset.File, asset.AssetType == AssetType.Image ? @"wwwroot/Assets/Images" :
                        asset.AssetType == AssetType.Video ? @"wwwroot/Assets/Videos" : @"wwwroot/Assets",
                    this.dataProvider.System.APIBaseURL);

                EstateAsset newAsset = new()
                {
                    Activate = asset.Activate,
                    AssetType = asset.AssetType,
                    CreatedDate = DateTime.Now,
                    Deleted = false,
                    EstateId = asset.EstateId,
                    LatestUpdate = null,
                    Name = asset.File.Name,
                    RouteURL = asset.RouteURL
                };

                await this._context.EstateAsset.AddAsync(newAsset);
                await this._context.SaveChangesAsync();

                return newAsset.Id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public async Task<int> UpdateEstateAsset(EstateAssetVM asset)
        {
            try
            {
                EstateAsset oldAsset = await this._context.EstateAsset
                    .Where(w => !w.Deleted && w.Id == asset.Id)
                    .SingleOrDefaultAsync();

                if (oldAsset != null)
                {
                    if (asset.File != null)
                    {
                        oldAsset.RouteURL = await FileService.UploadFileStream(
                            asset.File, asset.AssetType == AssetType.Image ? @"wwwroot/Assets/Images" :
                                asset.AssetType == AssetType.Video ? @"wwwroot/Assets/Videos" : @"wwwroot/Assets",
                            this.dataProvider.System.APIBaseURL);
                    }

                    oldAsset = this._mapper.Map<EstateAsset>(asset);

                    oldAsset.LatestUpdate = DateTime.Now;

                    this._context.EstateAsset.Update(oldAsset);
                    await this._context.SaveChangesAsync();

                    return 1;
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
