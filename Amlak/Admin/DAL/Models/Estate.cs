using DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Estate
    {
        [Key]
        public int Id { get; set; }
        public EstateType EstateType { get; set; }
        public int SizeOfLand { get; set; }
        public int SizeOfBuilding { get; set; }
        public int UnitsNumber { get; set; }
        public int FloorsNumber { get; set; }
        public int RoomsNumber { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string DimensionsGround { get; set; }
        public bool Underground { get; set; }
        public bool Balcony { get; set; }
        public bool Water { get; set; }
        public bool Electricity { get; set; }
        public bool Gas { get; set; }
        public bool License { get; set; }
        public DateTime? YearConstruction { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string GeographyPos { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string View { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string UnitFloor { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string RoomFloor { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string UnitPosition { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Address { get; set; }
        public bool Warehouse { get; set; }
        public bool ElectricDoor { get; set; }
        public bool Telephone { get; set; }
        public bool Cabinets { get; set; }
        public bool SwimmingPool { get; set; }
        public bool Elevator { get; set; }
        public bool Package { get; set; }
        public bool WaterCooler { get; set; }
        public bool Parking { get; set; }
        public bool Sauna { get; set; }
        public bool Janitor { get; set; }
        public bool Fireplace { get; set; }
        public bool Radiator { get; set; }
        public bool Terrace { get; set; }
        public bool MasterRoom { get; set; }
        public bool Hood { get; set; }
        public bool Lighting { get; set; }
        public bool Painting { get; set; }
        public bool GasCooler { get; set; }
        public bool FrenchToilet { get; set; }
        public bool DuctSplit { get; set; }
        public bool IPhoneVideo { get; set; }
        public bool CentralAntenna { get; set; }
        public bool CentralVacuumCleaner { get; set; }
        public bool Lobby { get; set; }
        public bool DesktopGas { get; set; }
        public bool Wallpaper { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LatestUpdate { get; set; }
        public bool Activate { get; set; }
        public bool Deleted { get; set; }

        public virtual Contract Contract { get; set; }
        public virtual ICollection<EstateAsset> EstateAssets { get; set; }
    }
}
