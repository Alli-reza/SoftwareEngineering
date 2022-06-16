import { ContractVM } from './contract.model';
import { CustomerVM } from './customer.model';

export class MyEstateVM {
  id?: number;
  estateName?: string;
  managerName?: string;
  description?: string;
  brand?: string;
  logoURL?: string;
  telephone?: string;
  address?: string;
  siteURL?: string;
  customers?: CustomerVM[];
  contracts?: ContractVM[];

  constructor(model: MyEstateVM) {
    this.id = model.id || 0;
    this.estateName = model.estateName || '';
    this.managerName = model.managerName || '';
    this.description = model.description || '';
    this.brand = model.brand || '';
    this.logoURL = model.logoURL || '';
    this.telephone = model.telephone || '';
    this.address = model.address || '';
    this.siteURL = model.siteURL || '';
    this.customers = model.customers || (null as any);
    this.contracts = model.contracts || (null as any);
  }
}
