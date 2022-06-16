import { AssetType } from './enums';

export class EstateAssetVM {
  id?: number;
  estateId?: number;
  name?: string;
  file?: File;
  routeURL?: string;
  assetType?: AssetType;
  assetType_view?: string;
  createdDate?: string;
  latestUpdate?: string;
  activate?: boolean;
}
