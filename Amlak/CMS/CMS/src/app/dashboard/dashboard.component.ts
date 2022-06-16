import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EntityCounters, Last10Customer } from '../shared/models/report.model';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Last10Customer>;
  mainLoader: boolean;

  counters: EntityCounters;
  last10Customer: Last10Customer[];
  displayedColumns: string[] = [
    'fullName',
    'phoneNumber',
    'createdDate',
    'sellingPrice',
    'loanAmount',
    'mortgageAmount',
    'amountBeforePay',
    'sizeOfBuilding',
    'address',
  ];
  dataSource: MatTableDataSource<Last10Customer>;

  constructor(private httpService: HttpService) {
    this.mainLoader = false;
    this.last10Customer = new Array<Last10Customer>();
    this.counters = new EntityCounters({});
    this.dataSource = new MatTableDataSource<Last10Customer>(
      this.last10Customer
    );
  }

  ngOnInit(): void {
    this.mainLoader = true;
    this.httpService.entityCounters().subscribe((counters) => {
      this.counters = counters;
      this.httpService
        .getLast10CustomersReport()
        .subscribe((last10Customer) => {
          this.last10Customer = last10Customer;
          this.dataSource = new MatTableDataSource<Last10Customer>(
            this.last10Customer
          );
          this.mainLoader = false;
          console.log(this.counters);
        });
    });
  }
}
