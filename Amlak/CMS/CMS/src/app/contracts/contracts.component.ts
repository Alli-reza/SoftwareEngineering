import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RemoveModalComponent } from '../shared/components/remove-modal/remove-modal.component';
import {
  ContractCollection,
  ContractVM,
} from '../shared/models/contract.model';
import { HelperService } from '../shared/services/Helper.service';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ContractVM>;

  loadUpdate: boolean;
  mainLoader: boolean;
  collection: ContractCollection;
  dataSource: MatTableDataSource<ContractVM>;
  pageItemsLength: number;

  displayedColumns: string[];
  columnsToDisplay: string[];

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    public helper: HelperService
  ) {
    this.collection = new ContractCollection({
      counts: 0,
      contracts: [],
      pageNumber: 0,
      searchWord: '',
      skip: 0,
      take: 10,
    });
    this.loadUpdate = this.mainLoader = false;
    this.displayedColumns = [
      'customerName',
      'documentType',
      'createdDate',
      'activate',
      'actions',
    ];
    this.dataSource = new MatTableDataSource<ContractVM>(
      this.collection.contracts
    );
  }

  ngOnInit(): void {
    this.mainLoader = true;
    this.initData();
  }

  initData(): void {
    this.dataSource.data = this.collection.contracts;
    this.loadData().then((userCollection) => {
      this.collection = userCollection;
      this.reloadTable();
    });
  }

  async loadData(): Promise<ContractCollection> {
    try {
      this.loadUpdate = true;
      let res = await this.httpService
        .getAllContracts(this.collection)
        .toPromise();
      res.contracts = res.contracts?.map((m) => {
        m.documentType_view = this.helper.documentTypeView(m.documentType ?? 0);
        return { ...m };
      });
      return res;
    } catch (error) {
      console.error(error);
      return null as any;
    }
  }

  removeItem(element: ContractVM): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      width: '400px',
      data: { id: element.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.loadUpdate = true;
        this.httpService.deleteContract(element.id ?? 0).subscribe(
          () => {
            this.collection.contracts = this.collection.contracts?.filter(
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
      this.collection.contracts &&
      this.collection.contracts.length
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
    this.dataSource = new MatTableDataSource<ContractVM>(
      this.collection.contracts
    );
    setTimeout(() => {
      this.mainLoader = this.loadUpdate = false;
      this.pageItemsLength = Math.ceil(this.collection.counts / 10);
    }, 100);
  }
}
