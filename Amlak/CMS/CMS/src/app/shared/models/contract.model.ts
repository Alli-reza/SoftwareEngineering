import { DocumentType } from './enums';
import { PageCollection } from './utils.model';

export class ContractVM {
  id?: number;
  customerId?: number;
  myEstateId?: number;
  estateId?: number;
  customerName?: string;
  documentType?: DocumentType;
  documentType_view?: string;
  sellingPrice?: number;
  loanAmount?: number;
  mortgageAmount?: number;
  amountBeforePay?: number;
  expirationTime?: string;
  numberOfPeople?: number;
  createdDate?: string;
  latestUpdate?: string;
  activate?: boolean;
  contract?: ContractVM;

  constructor(model: ContractVM) {
    this.id = model.id || 0;
    this.customerId = model.customerId || 0;
    this.myEstateId = model.myEstateId || 1;
    this.estateId = model.estateId || 0;
    this.customerName = model.customerName || '';
    this.documentType = model.documentType || DocumentType.HasDocument;
    this.documentType_view = model.documentType_view || '';
    this.sellingPrice = model.sellingPrice || 0;
    this.loanAmount = model.loanAmount || 0;
    this.mortgageAmount = model.mortgageAmount || 0;
    this.amountBeforePay = model.amountBeforePay || 0;
    this.expirationTime = model.expirationTime || '';
    this.numberOfPeople = model.numberOfPeople || 1;
    this.createdDate = model.createdDate || '';
    this.latestUpdate = model.latestUpdate || '';
    this.activate = model.activate || true;
    this.contract = model.contract || (null as any);
  }
}

export class ContractCollection extends PageCollection {
  contracts?: ContractVM[];

  constructor(model: ContractCollection) {
    super(model);

    this.contracts = model.contracts || (null as any);
  }
}
