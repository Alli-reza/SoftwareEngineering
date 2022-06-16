import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractVM } from 'src/app/shared/models/contract.model';
import { CustomerViewList } from 'src/app/shared/models/customer.model';
import { EstateListView } from 'src/app/shared/models/estate.model';
import { HelperService } from 'src/app/shared/services/Helper.service';
import { HttpService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss'],
})
export class ContractDetailsComponent implements OnInit {
  contract: ContractVM;
  loadUpdate: boolean;
  mainLoader: boolean;
  customersLoader: boolean;
  estatesLoader: boolean;
  contractId: number;

  estates: EstateListView[];
  customers: CustomerViewList[];

  customerId = new FormControl(0, []);
  estateId = new FormControl(0, []);
  sellingPrice = new FormControl(0, [Validators.min(0)]);
  loanAmount = new FormControl(0, [Validators.min(0)]);
  mortgageAmount = new FormControl(0, [Validators.min(0)]);
  amountBeforePay = new FormControl(0, [Validators.min(0)]);
  expirationTime = new FormControl('', []);
  numberOfPeople = new FormControl(0, [Validators.min(0)]);
  documentType = new FormControl(0, []);
  activate = new FormControl(true, []);

  contractForm: FormGroup = this.formBuilder.group({
    customerId: this.customerId,
    estateId: this.estateId,
    sellingPrice: this.sellingPrice,
    loanAmount: this.loanAmount,
    mortgageAmount: this.mortgageAmount,
    amountBeforePay: this.amountBeforePay,
    expirationTime: this.expirationTime,
    numberOfPeople: this.numberOfPeople,
    documentType: this.documentType,
    activate: this.activate,
  });

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    public helper: HelperService,
    private formBuilder: FormBuilder
  ) {
    this.contract = new ContractVM({});
    this.loadUpdate =
      this.mainLoader =
      this.customersLoader =
      this.estatesLoader =
        false;
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params.id;
    if (this.contractId > 0) {
      this.mainLoader = true;
      this.httpService
        .getContractById(this.contractId)
        .subscribe((contract) => {
          this.contract = contract;
          this.contractForm.patchValue(this.contract);
          this.mainLoader = false;
          this.getListViewData();
          this.estateId.disable();
          this.customerId.disable();
          this.documentType.disable();
          this.activate.disable();
        });
    } else {
      this.getListViewData();
    }
  }

  getListViewData(): void {
    this.customersLoader = true;
    this.estatesLoader = true;
    this.httpService.getAllEstateForListView().subscribe((estates) => {
      this.estates = estates;
      this.httpService.getAllCustomersForListView().subscribe((customers) => {
        this.customers = customers;
        this.estatesLoader = false;
        this.customersLoader = false;
      });
    });
  }

  onSaveChanges(): void {
    this.loadUpdate = true;
    this.contract.sellingPrice = this.contractForm.value.sellingPrice;
    this.contract.loanAmount = this.contractForm.value.loanAmount;
    this.contract.mortgageAmount = this.contractForm.value.mortgageAmount;
    this.contract.amountBeforePay = this.contractForm.value.amountBeforePay;
    this.contract.expirationTime = this.contractForm.value.expirationTime;
    this.contract.numberOfPeople = this.contractForm.value.numberOfPeople;
    this.contract.documentType = this.contractForm.value.documentType;
    this.contract.activate = this.contractForm.value.activate;
    this.httpService.addContract(this.contract).subscribe((result) => {
      if (result > 0) {
        this.loadUpdate = false;
        this.helper.notify('ویرایش انجام شد', 'موفقیت آمیز', 2000);
        this.contractForm.reset();
      }
    });
  }
}
