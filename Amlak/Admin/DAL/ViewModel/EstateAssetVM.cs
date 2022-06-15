using DAL.Enums;
using Microsoft.AspNetCore.Http;

namespace DAL.ViewModel
{
    public class EstateAssetVM
    {
        public int Id { get; set; }
        public int? EstateId { get; set; }
        public string Name { get; set; }
        public IFormFile File { get; set; }
        public string RouteURL { get; set; }
        public AssetType AssetType { get; set; }
        public string CreatedDate { get; set; }
        public string LatestUpdate { get; set; }
        public bool Activate { get; set; }
    }
}
