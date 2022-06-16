import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RemoveModalComponent } from '../shared/components/remove-modal/remove-modal.component';
import { EstateCollection, EstateVM } from '../shared/models/estate.model';
import { HelperService } from '../shared/services/Helper.service';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.scss'],
})
export class EstatesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EstateVM>;

  loadUpdate: boolean;
  mainLoader: boolean;
  collection: EstateCollection;
  dataSource: MatTableDataSource<EstateVM>;
  pageItemsLength: number;

  displayedColumns: string[];
  columnsToDisplay: string[];

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    public helper: HelperService
  ) {
    this.collection = new EstateCollection({
      counts: 0,
      estates: [],
      pageNumber: 0,
      searchWord: '',
      skip: 0,
      take: 10,
    });
    this.loadUpdate = this.mainLoader = false;
    this.displayedColumns = [
      'estateType',
      'sellingPrice',
      'mortgageAmount',
      'amountBeforePay',
      'sizeOfBuilding',
      'activate',
      'actions',
    ];
    this.dataSource = new MatTableDataSource<EstateVM>(this.collection.estates);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.mainLoader = true;
    this.initData();
  }

  initData(): void {
    this.dataSource.data = this.collection.estates;
    this.loadData().then((userCollection) => {
      this.collection = userCollection;
      this.reloadTable();
    });
  }

  async loadData(): Promise<EstateCollection> {
    try {
      this.loadUpdate = true;
      let res = await this.httpService
        .getAllEstates(this.collection)
        .toPromise();
      res.estates = res.estates?.map((m) => {
        m.estateType_view = this.helper.estateTypeView(m.estateType ?? 0);
        return { ...m };
      });
      return res;
    } catch (error) {
      console.error(error);
      return null as any;
    }
  }

  removeItem(element: EstateVM): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      width: '400px',
      data: { id: element.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.loadUpdate = true;
        this.httpService.deleteEstate(element.id ?? 0).subscribe(
          () => {
            this.collection.estates = this.collection.estates?.filter(
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
      this.collection.estates &&
      this.collection.estates.length
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
    this.dataSource = new MatTableDataSource<EstateVM>(
      this.collection.estates
    );
    setTimeout(() => {
      this.mainLoader = this.loadUpdate = false;
      this.pageItemsLength = Math.ceil(this.collection.counts / 10);
    }, 100);
  }
}
