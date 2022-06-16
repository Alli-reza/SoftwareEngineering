import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RemoveModalComponent } from '../shared/components/remove-modal/remove-modal.component';
import {
  CustomerCollection,
  CustomerVM,
} from '../shared/models/customer.model';
import { HelperService } from '../shared/services/Helper.service';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CustomerVM>;

  loadUpdate: boolean;
  mainLoader: boolean;
  collection: CustomerCollection;
  dataSource: MatTableDataSource<CustomerVM>;
  pageItemsLength: number;

  displayedColumns: string[];
  columnsToDisplay: string[];

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    public helper: HelperService
  ) {
    this.collection = new CustomerCollection({
      counts: 0,
      customers: [],
      pageNumber: 0,
      searchWord: '',
      skip: 0,
      take: 10,
    });
    this.loadUpdate = this.mainLoader = false;
    this.displayedColumns = [
      'fullName',
      'phoneNumber',
      'customerType',
      'activate',
      'actions',
    ];
    this.dataSource = new MatTableDataSource<CustomerVM>(
      this.collection.customers
    );
  }

  ngOnInit(): void {
    this.mainLoader = true;
    this.initData();
  }

  initData(): void {
    this.dataSource.data = this.collection.customers;
    this.loadData().then((userCollection) => {
      this.collection = userCollection;
      this.reloadTable();
    });
  }

  async loadData(): Promise<CustomerCollection> {
    try {
      this.loadUpdate = true;
      let res = await this.httpService
        .getAllCutomers(this.collection)
        .toPromise();
      res.customers = res.customers?.map((m) => {
        m.contractType_view = this.helper.contractTypeView(m.contractType ?? 0);
        m.customerType_view = this.helper.customerTypeView(m.customerType ?? 0);
        return { ...m };
      });
      return res;
    } catch (error) {
      console.error(error);
      return null as any;
    }
  }

  removeItem(element: CustomerVM): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      width: '400px',
      data: { id: element.id, name: element.fullName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.loadUpdate = true;
        this.httpService.deleteCustomer(element.id ?? 0).subscribe(
          () => {
            this.collection.customers = this.collection.customers?.filter(
              (f) => f.id !== element.id
            );
            this.reloadTable();
            this.loadUpdate = false;
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  hasObjects(): boolean {
    return this.collection &&
      this.collection.customers &&
      this.collection.customers.length
      ? true
      : false;
  }

  changePage(event: PageEvent): void {
    if (this.collection.pageNumber !== event.pageIndex)
      this.collection.pageNumber = event.pageIndex;

    this.collection.skip = this.collection.take * this.collection.pageNumber;
    this.collection.take = event.pageSize;
    this.loadData().then((result) => {
      this.collection = result;
      this.reloadTable();
    });
  }

  reloadTable(): void {
    this.dataSource = new MatTableDataSource<CustomerVM>(
      this.collection.customers
    );
    setTimeout(() => {
      this.mainLoader = this.loadUpdate = false;
      this.pageItemsLength = Math.ceil(this.collection.counts / 10);
    }, 100);
  }
}
