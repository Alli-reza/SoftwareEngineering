export class Last10Customer {
  fullName?: string;
  phoneNumber?: string;
  createdDate?: string;
  sellingPrice?: number;
  loanAmount?: number;
  mortgageAmount?: number;
  amountBeforePay?: number;
  sizeOfBuilding?: number;
  address?: string;

  constructor(model: Last10Customer) {
    this.fullName = model.fullName || '';
    this.phoneNumber = model.phoneNumber || '';
    this.createdDate = model.createdDate || '';
    this.sellingPrice = model.sellingPrice || 0;
    this.loanAmount = model.loanAmount || 0;
    this.mortgageAmount = model.mortgageAmount || 0;
    this.amountBeforePay = model.amountBeforePay || 0;
    this.sizeOfBuilding = model.sizeOfBuilding || 0;
    this.address = model.address || '';
  }
}

export class EntityCounters {
  countAllCustomers?: number;
  countAllContracts?: number;
  countAllEstate?: number;

  constructor(model: EntityCounters) {
    this.countAllCustomers = model.countAllCustomers || 0;
    this.countAllContracts = model.countAllContracts || 0;
    this.countAllEstate = model.countAllEstate || 0;
  }
}