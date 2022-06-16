import { ContractVM } from './contract.model';
import { EstateType } from './enums';
import { EstateAssetVM } from './estateAsset.model';
import { PageCollection } from './utils.model';

export class EstateVM {
  id?: number;
  estateType?: EstateType;
  estateType_view?: string;
  sizeOfLand?: number;
  sizeOfBuilding?: number;
  unitsNumber?: number;
  floorsNumber?: number;
  roomsNumber?: number;
  dimensionsGround?: string;
  underground?: boolean;
  balcony?: boolean;
  water?: boolean;
  electricity?: boolean;
  gas?: boolean;
  license?: boolean;
  yearConstruction?: string;
  geographyPos?: string;
  view?: string;
  unitFloor?: string;
  roomFloor?: string;
  unitPosition?: string;
  address?: string;
  warehouse?: boolean;
  electricDoor?: boolean;
  telephone?: boolean;
  cabinets?: boolean;
  swimmingPool?: boolean;
  elevator?: boolean;
  package?: boolean;
  waterCooler?: boolean;
  parking?: boolean;
  sauna?: boolean;
  janitor?: boolean;
  fireplace?: boolean;
  radiator?: boolean;
  terrace?: boolean;
  masterRoom?: boolean;
  hood?: boolean;
  lighting?: boolean;
  painting?: boolean;
  gasCooler?: boolean;
  frenchToilet?: boolean;
  ductSplit?: boolean;
  iPhoneVideo?: boolean;
  centralAntenna?: boolean;
  centralVacuumCleaner?: boolean;
  lobby?: boolean;
  desktopGas?: boolean;
  wallpaper?: boolean;
  description?: string;
  createdDate?: string;
  latestUpdate?: string;
  activate?: boolean;
  contract?: ContractVM;
  estateAssets?: EstateAssetVM[];

  constructor(model: EstateVM) {
    this.id = model.id || 0;
    this.estateType = model.estateType || EstateType.Apartment;
    this.estateType_view = model.estateType_view || '';
    this.sizeOfLand = model.sizeOfLand || 0;
    this.sizeOfBuilding = model.sizeOfBuilding || 0;
    this.unitsNumber = model.unitsNumber || 0;
    this.floorsNumber = model.floorsNumber || 0;
    this.roomsNumber = model.roomsNumber || 0;
    this.dimensionsGround = model.dimensionsGround || '';
    this.underground = model.underground || false;
    this.balcony = model.balcony || false;
    this.water = model.water || false;
    this.electricity = model.electricity || false;
    this.gas = model.gas || false;
    this.license = model.license || false;
    this.yearConstruction = model.yearConstruction || '';
    this.geographyPos = model.geographyPos || '';
    this.view = model.view || '';
    this.unitFloor = model.unitFloor || '';
    this.roomFloor = model.roomFloor || '';
    this.unitPosition = model.unitPosition || '';
    this.address = model.address || '';
    this.warehouse = model.warehouse || false;
    this.electricDoor = model.electricDoor || false;
    this.telephone = model.telephone || false;
    this.cabinets = model.cabinets || false;
    this.swimmingPool = model.swimmingPool || false;
    this.elevator = model.elevator || false;
    this.package = model.package || false;
    this.waterCooler = model.waterCooler || false;
    this.parking = model.parking || false;
    this.sauna = model.sauna || false;
    this.janitor = model.janitor || false;
    this.fireplace = model.fireplace || false;
    this.radiator = model.radiator || false;
    this.terrace = model.terrace || false;
    this.masterRoom = model.masterRoom || false;
    this.hood = model.hood || false;
    this.lighting = model.lighting || false;
    this.painting = model.painting || false;
    this.gasCooler = model.gasCooler || false;
    this.frenchToilet = model.frenchToilet || false;
    this.ductSplit = model.ductSplit || false;
    this.iPhoneVideo = model.iPhoneVideo || false;
    this.centralAntenna = model.centralAntenna || false;
    this.centralVacuumCleaner = model.centralVacuumCleaner || false;
    this.lobby = model.lobby || false;
    this.desktopGas = model.desktopGas || false;
    this.wallpaper = model.wallpaper || false;
    this.description = model.description || '';
    this.createdDate = model.createdDate || '';
    this.latestUpdate = model.latestUpdate || '';
    this.activate = model.activate || true;
    this.contract = model.contract || (null as any);
    this.estateAssets = model.estateAssets || (null as any);
  }
}

export class EstateCollection extends PageCollection {
  estates?: EstateVM[];

  constructor(model: EstateCollection) {
    super(model);

    this.estates = model.estates || (null as any);
  }
}

export class EstateListView {
  id?: number;
  description?: string;

  constructor(model: EstateListView) {
    this.id = model.id || 0;
    this.description = model.description || '';
  }
}
