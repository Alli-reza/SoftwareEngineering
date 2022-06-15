using DAL.Enums;
using System.Collections.Generic;

namespace DAL.ViewModel
{
    public class EstateVM
    {
        public int Id { get; set; }
        public EstateType EstateType { get; set; }
        public int SizeOfLand { get; set; }
        public int SizeOfBuilding { get; set; }
        public int UnitsNumber { get; set; }
        public int FloorsNumber { get; set; }
        public int RoomsNumber { get; set; }
        public string DimensionsGround { get; set; }
        public bool Underground { get; set; }
        public bool Balcony { get; set; }
        public bool Water { get; set; }
        public bool Electricity { get; set; }
        public bool Gas { get; set; }
        public bool License { get; set; }
        public string YearConstruction { get; set; }
        public string GeographyPos { get; set; }
        public string View { get; set; }
        public string UnitFloor { get; set; }
        public string RoomFloor { get; set; }
        public string UnitPosition { get; set; }
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
        public string Description { get; set; }
        public string CreatedDate { get; set; }
        public string LatestUpdate { get; set; }
        public bool Activate { get; set; }

        public ContractVM Contract { get; set; }
        public IEnumerable<EstateAssetVM> EstateAssets { get; set; }
    }

    public class EstateCollection : PageCollection
    {
        public IEnumerable<EstateVM> Estates { get; set; }
    }

    public class EstateListView
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
