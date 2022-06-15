using DAL.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class EstateAsset
    {
        [Key]
        public int Id { get; set; }
        public int? EstateId { get; set; }

        [Column(TypeName = "nvarchar(300)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string RouteURL { get; set; }
        public AssetType AssetType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LatestUpdate { get; set; }
        public bool Activate { get; set; }
        public bool Deleted { get; set; }

        [ForeignKey("EstateId")]
        public virtual Estate Estate { get; set; }
    }
}
