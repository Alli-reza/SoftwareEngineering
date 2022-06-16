import { ContractVM } from './contract.model';
import { ContractType, CustomerType } from './enums';
import { PageCollection } from './utils.model';

export class CustomerVM {
  id?: number;
  myEstateId?: number;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  customerType?: CustomerType;
  customerType_view?: string;
  contractType?: ContractType;
  contractType_view?: string;
  createdDate?: string;
  latestUpdate?: string;
  activate?: boolean;
  contracts?: ContractVM[];

  constructor(model: CustomerVM) {
    this.id = model.id || 0;
    this.myEstateId = model.myEstateId || 0;
    this.fullName = model.fullName || '';
    this.phoneNumber = model.phoneNumber || '';
    this.address = model.address || '';
    this.customerType = model.customerType || CustomerType.Tenant;
    this.customerType_view = model.customerType_view || '';
    this.contractType = model.contractType || ContractType.IntentionToSell;
    this.contractType_view = model.contractType_view || '';
    this.createdDate = model.createdDate || '';
    this.latestUpdate = model.latestUpdate || '';
    this.activate = model.activate || true;
    this.contracts = model.contracts || (null as any);
  }
}

export class CustomerCollection extends PageCollection {
  customers?: CustomerVM[];

  constructor(model: CustomerCollection) {
    super(model);

    this.customers = model.customers || (null as any);
  }
}

export class CustomerViewList {
  id?: number;
  fullName?: string;
  phoneNumber?: string;

  constructor(model: CustomerViewList) {
    this.id = model.id || 0;
    this.fullName = model.fullName || '';
    this.phoneNumber = model.phoneNumber || '';
  }
}
