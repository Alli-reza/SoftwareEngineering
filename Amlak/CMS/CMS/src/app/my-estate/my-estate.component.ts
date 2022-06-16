import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyEstateVM } from '../shared/models/myEstate.model';
import { HelperService } from '../shared/services/Helper.service';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-my-estate',
  templateUrl: './my-estate.component.html',
  styleUrls: ['./my-estate.component.scss'],
})
export class MyEstateComponent implements OnInit {
  myEstate: MyEstateVM;
  myEstateId: number;
  loadUpdate: boolean;
  mainLoader: boolean;

  estateName = new FormControl('', [Validators.maxLength(50)]);
  managerName = new FormControl('', [Validators.maxLength(50)]);
  description = new FormControl('', [Validators.maxLength(2000)]);
  brand = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  logoURL = new FormControl('', [Validators.maxLength(4000)]);
  telephone = new FormControl('', [Validators.maxLength(12)]);
  address = new FormControl('', [Validators.maxLength(4000)]);
  siteURL = new FormControl('', [Validators.maxLength(2000)]);

  myEstateForm: FormGroup = this.formBuilder.group({
    estateName: this.estateName,
    managerName: this.managerName,
    description: this.description,
    brand: this.brand,
    logoURL: this.logoURL,
    telephone: this.telephone,
    address: this.address,
    siteURL: this.siteURL,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    public helper: HelperService,
    private formBuilder: FormBuilder
  ) {
    this.myEstateId = 0;
    this.myEstate = new MyEstateVM({});
    this.loadUpdate = this.mainLoader = false;
  }

  ngOnInit(): void {
    this.mainLoader = true;
    this.myEstateId = +window.localStorage.getItem('myEstateId');
    this.httpService.getMyEstate().subscribe((myEstate) => {
      this.myEstate = myEstate;
      this.myEstateForm.patchValue(this.myEstate);
      this.mainLoader = false;
    });
  }

  onSaveChanges(): void {
    this.loadUpdate = true;
    this.myEstate.estateName = this.myEstateForm.value.estateName;
    this.myEstate.managerName = this.myEstateForm.value.managerName;
    this.myEstate.description = this.myEstateForm.value.description;
    this.myEstate.brand = this.myEstateForm.value.brand;
    this.myEstate.logoURL = this.myEstateForm.value.logoURL;
    this.myEstate.telephone = this.myEstateForm.value.telephone;
    this.myEstate.address = this.myEstateForm.value.address;
    this.myEstate.siteURL = this.myEstateForm.value.siteURL;

    this.httpService.updateMyEstate(this.myEstate).subscribe((result) => {
      if (result > 0) {
        this.helper.notify('ویرایش انجام شد', 'موفقیت آمیز', 2000);
      } else {
        this.helper.notify('متاسفانه خطایی رخ داده', 'اخطار', 2000);
      }
      this.loadUpdate = false;
    });
  }
}
