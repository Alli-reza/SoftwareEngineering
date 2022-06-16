import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerVM } from 'src/app/shared/models/customer.model';
import { HelperService } from 'src/app/shared/services/Helper.service';
import { HttpService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  customer: CustomerVM;
  customerId: number;
  loadUpdate: boolean;
  mainLoader: boolean;

  fullName = new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
  ]);
  address = new FormControl('', [
    Validators.required,
    Validators.maxLength(4000),
  ]);
  customerType = new FormControl(0, [Validators.required]);
  contractType = new FormControl(0, [Validators.required]);
  activate = new FormControl(true, []);

  customerForm: FormGroup = this.formBuilder.group({
    fullName: this.fullName,
    phoneNumber: this.phoneNumber,
    address: this.address,
    customerType: this.customerType,
    contractType: this.contractType,
    activate: this.activate,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    public helper: HelperService,
    private formBuilder: FormBuilder
  ) {
    this.customerId = 0;
    this.customer = new CustomerVM({});
    this.loadUpdate = this.mainLoader = false;
  }

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.params.id;
    if (this.customerId && this.customerId > 0) {
      this.mainLoader = true;
      this.httpService
        .getCustomerById(this.customerId)
        .subscribe((customer) => {
          this.customer = customer;
          this.customerForm.patchValue(this.customer);
          this.mainLoader = false;
        });
    }
  }

  onSaveChanges(): void {
    this.loadUpdate = true;

    this.customer.fullName = this.customerForm.value.fullName;
    this.customer.phoneNumber = this.customerForm.value.phoneNumber;
    this.customer.customerType = this.customerForm.value.customerType;
    this.customer.contractType = this.customerForm.value.contractType;
    this.customer.address = this.customerForm.value.address;
    this.customer.activate = this.customerForm.value.activate;

    if (this.customerId > 0) {
      this.httpService.updateCustomer(this.customer).subscribe((result) => {
        if (result > 0) {
          this.helper.notify('ویرایش انجام شد', 'موفقیت آمیز', 2000);
        } else {
          this.helper.notify('متاسفانه خطایی رخ داده', 'اخطار', 2000);
        }
        this.loadUpdate = false;
      });
    } else {
      this.customer.myEstateId = +window.localStorage.getItem('myEstateId');
      this.httpService.addCustomer(this.customer).subscribe(result => {
        if (result > 0) {
          this.helper.notify('افزودن انجام شد', 'موفقیت آمیز', 2000);
          this.customerForm.reset();
        } else {
          this.helper.notify('متاسفانه خطایی رخ داده', 'اخطار', 2000);
        }
        this.loadUpdate = false;
      });
    }
  }
}
