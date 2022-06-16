import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstateVM } from 'src/app/shared/models/estate.model';
import { HelperService } from 'src/app/shared/services/Helper.service';
import { HttpService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-estate-details',
  templateUrl: './estate-details.component.html',
  styleUrls: ['./estate-details.component.scss'],
})
export class EstateDetailsComponent implements OnInit {
  estate: EstateVM;
  estateId: number;
  loadUpdate: boolean;
  mainLoader: boolean;

  estateType = new FormControl(0, []);
  sizeOfLand = new FormControl(1, [Validators.min(1), Validators.max(1000)]);
  sizeOfBuilding = new FormControl(1, [
    Validators.min(1),
    Validators.max(1000),
  ]);
  unitsNumber = new FormControl(1, [Validators.min(1), Validators.max(1000)]);
  floorsNumber = new FormControl(1, [Validators.min(1), Validators.max(100)]);
  roomsNumber = new FormControl(0, [Validators.min(0), Validators.max(50)]);
  dimensionsGround = new FormControl('', [Validators.maxLength(10)]);
  underground = new FormControl(false, []);
  balcony = new FormControl(false, []);
  water = new FormControl(false, []);
  electricity = new FormControl(false, []);
  gas = new FormControl(false, []);
  license = new FormControl(false, []);
  yearConstruction = new FormControl('', []);
  geographyPos = new FormControl('', [Validators.maxLength(50)]);
  view = new FormControl('', [Validators.maxLength(30)]);
  unitFloor = new FormControl('', [Validators.maxLength(30)]);
  roomFloor = new FormControl('', [Validators.maxLength(30)]);
  unitPosition = new FormControl('', [Validators.maxLength(30)]);
  address = new FormControl('', [Validators.maxLength(4000)]);
  warehouse = new FormControl(false, []);
  electricDoor = new FormControl(false, []);
  telephone = new FormControl(false, []);
  cabinets = new FormControl(false, []);
  swimmingPool = new FormControl(false, []);
  elevator = new FormControl(false, []);
  package = new FormControl(false, []);
  waterCooler = new FormControl(false, []);
  parking = new FormControl(false, []);
  sauna = new FormControl(false, []);
  janitor = new FormControl(false, []);
  fireplace = new FormControl(false, []);
  radiator = new FormControl(false, []);
  terrace = new FormControl(false, []);
  masterRoom = new FormControl(false, []);
  hood = new FormControl(false, []);
  lighting = new FormControl(false, []);
  painting = new FormControl(false, []);
  gasCooler = new FormControl(false, []);
  frenchToilet = new FormControl(false, []);
  ductSplit = new FormControl(false, []);
  iPhoneVideo = new FormControl(false, []);
  centralAntenna = new FormControl(false, []);
  centralVacuumCleaner = new FormControl(false, []);
  lobby = new FormControl(false, []);
  desktopGas = new FormControl(false, []);
  wallpaper = new FormControl(false, []);
  description = new FormControl('', [Validators.maxLength(4000)]);
  activate = new FormControl(false, []);

  estateForm: FormGroup = this.formBuilder.group({
    estateType: this.estateType,
    sizeOfLand: this.sizeOfLand,
    sizeOfBuilding: this.sizeOfBuilding,
    unitsNumber: this.unitsNumber,
    floorsNumber: this.floorsNumber,
    roomsNumber: this.roomsNumber,
    dimensionsGround: this.dimensionsGround,
    underground: this.underground,
    balcony: this.balcony,
    water: this.water,
    electricity: this.electricity,
    gas: this.gas,
    license: this.license,
    yearConstruction: this.yearConstruction,
    geographyPos: this.geographyPos,
    view: this.view,
    unitFloor: this.unitFloor,
    roomFloor: this.roomFloor,
    unitPosition: this.unitPosition,
    address: this.address,
    warehouse: this.warehouse,
    electricDoor: this.electricDoor,
    telephone: this.telephone,
    cabinets: this.cabinets,
    swimmingPool: this.swimmingPool,
    elevator: this.elevator,
    package: this.package,
    waterCooler: this.waterCooler,
    parking: this.parking,
    sauna: this.sauna,
    janitor: this.janitor,
    fireplace: this.fireplace,
    radiator: this.radiator,
    terrace: this.terrace,
    masterRoom: this.masterRoom,
    hood: this.hood,
    lighting: this.lighting,
    painting: this.painting,
    gasCooler: this.gasCooler,
    frenchToilet: this.frenchToilet,
    ductSplit: this.ductSplit,
    iPhoneVideo: this.iPhoneVideo,
    centralAntenna: this.centralAntenna,
    centralVacuumCleaner: this.centralVacuumCleaner,
    lobby: this.lobby,
    desktopGas: this.desktopGas,
    wallpaper: this.wallpaper,
    description: this.description,
    activate: this.activate,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    public helper: HelperService,
    private formBuilder: FormBuilder
  ) {
    this.estateId = 0;
    this.estate = new EstateVM({});
    this.loadUpdate = this.mainLoader = false;
  }

  ngOnInit(): void {
    this.estateId = +this.route.snapshot.params.id;
    if (this.estateId && this.estateId > 0) {
      this.mainLoader = true;
      this.httpService.getEstateById(this.estateId).subscribe((estate) => {
        this.estate = estate;
        this.estateForm.patchValue(this.estate);
        this.mainLoader = false;
      });
    }
  }

  onSaveChanges(): void {
    this.loadUpdate = true;

    this.estate.estateType = this.estateForm.value.estateType;
    this.estate.sizeOfLand = this.estateForm.value.sizeOfLand;
    this.estate.sizeOfBuilding = this.estateForm.value.sizeOfBuilding;
    this.estate.unitsNumber = this.estateForm.value.unitsNumber;
    this.estate.floorsNumber = this.estateForm.value.floorsNumber;
    this.estate.roomsNumber = this.estateForm.value.roomsNumber;
    this.estate.dimensionsGround = this.estateForm.value.dimensionsGround;
    this.estate.underground = this.estateForm.value.underground;
    this.estate.balcony = this.estateForm.value.balcony;
    this.estate.electricity = this.estateForm.value.electricity;
    this.estate.gas = this.estateForm.value.gas;
    this.estate.license = this.estateForm.value.license;
    this.estate.yearConstruction = this.estateForm.value.yearConstruction;
    this.estate.geographyPos = this.estateForm.value.geographyPos;
    this.estate.view = this.estateForm.value.view;
    this.estate.unitFloor = this.estateForm.value.unitFloor;
    this.estate.roomFloor = this.estateForm.value.roomFloor;
    this.estate.unitPosition = this.estateForm.value.unitPosition;
    this.estate.address = this.estateForm.value.address;
    this.estate.warehouse = this.estateForm.value.warehouse;
    this.estate.electricDoor = this.estateForm.value.electricDoor;
    this.estate.telephone = this.estateForm.value.telephone;
    this.estate.cabinets = this.estateForm.value.cabinets;
    this.estate.swimmingPool = this.estateForm.value.swimmingPool;
    this.estate.elevator = this.estateForm.value.elevator;
    this.estate.package = this.estateForm.value.package;
    this.estate.waterCooler = this.estateForm.value.waterCooler;
    this.estate.parking = this.estateForm.value.parking;
    this.estate.sauna = this.estateForm.value.sauna;
    this.estate.janitor = this.estateForm.value.janitor;
    this.estate.fireplace = this.estateForm.value.fireplace;
    this.estate.radiator = this.estateForm.value.radiator;
    this.estate.terrace = this.estateForm.value.terrace;
    this.estate.masterRoom = this.estateForm.value.masterRoom;
    this.estate.hood = this.estateForm.value.hood;
    this.estate.lighting = this.estateForm.value.lighting;
    this.estate.painting = this.estateForm.value.painting;
    this.estate.gasCooler = this.estateForm.value.gasCooler;
    this.estate.frenchToilet = this.estateForm.value.frenchToilet;
    this.estate.ductSplit = this.estateForm.value.ductSplit;
    this.estate.iPhoneVideo = this.estateForm.value.iPhoneVideo;
    this.estate.centralAntenna = this.estateForm.value.centralAntenna;
    this.estate.centralVacuumCleaner =
      this.estateForm.value.centralVacuumCleaner;
    this.estate.lobby = this.estateForm.value.lobby;
    this.estate.desktopGas = this.estateForm.value.desktopGas;
    this.estate.wallpaper = this.estateForm.value.wallpaper;
    this.estate.description = this.estateForm.value.description;
    this.estate.activate = this.estateForm.value.activate;

    if (this.estateId > 0) {
      this.httpService.updateEstate(this.estate).subscribe((result) => {
        if (result > 0) {
          this.helper.notify('ویرایش انجام شد', 'موفقیت آمیز', 2000);
        } else {
          this.helper.notify('متاسفانه خطایی رخ داده', 'اخطار', 2000);
        }
        this.loadUpdate = false;
      });
    } else {
      this.httpService.addEstate(this.estate).subscribe((result) => {
        if (result > 0) {
          this.helper.notify('افزودن انجام شد', 'موفقیت آمیز', 2000);
          this.estateForm.reset();
        } else {
          this.helper.notify('متاسفانه خطایی رخ داده', 'اخطار', 2000);
        }
        this.loadUpdate = false;
      });
    }
  }
}
