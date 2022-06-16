import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractCollection, ContractVM } from '../models/contract.model';
import {
  CustomerCollection,
  CustomerViewList,
  CustomerVM,
} from '../models/customer.model';
import {
  EstateCollection,
  EstateListView,
  EstateVM,
} from '../models/estate.model';
import { MyEstateVM } from '../models/myEstate.model';
import { EntityCounters, Last10Customer } from '../models/report.model';
import { PageCollection } from '../models/utils.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  //--------Contracts api services----------------
  public getAllContracts(data: PageCollection): Observable<ContractCollection> {
    const url =
      environment.dataApiUrl +
      `/Contract/GetAllContracts?skip=${data.skip}&take=${data.take}&pageNumber=${data.pageNumber}&searchWord=${data.searchWord}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<ContractCollection>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getContractById(id: number): Observable<ContractVM> {
    const url = environment.dataApiUrl + `/Contract/GetContractById/${id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<ContractVM>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public addContract(data: ContractVM): Observable<number> {
    const url = environment.dataApiUrl + `/Contract/AddContract`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public deleteContract(id: number): Observable<boolean> {
    const url = environment.dataApiUrl + `/Contract/DeleteContract/${id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<boolean>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
  //--------------------------------------------

  //------Customers api Services-------------------
  public getAllCustomersForListView(): Observable<CustomerViewList[]> {
    const url = environment.dataApiUrl + `/Customer/GetAllCustomersForListView`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<CustomerViewList[]>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllCutomers(data: PageCollection): Observable<CustomerCollection> {
    const url =
      environment.dataApiUrl +
      `/Customer/GetAllCutomers?skip=${data.skip}&take=${data.take}&pageNumber=${data.pageNumber}&searchWord=${data.searchWord}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<CustomerCollection>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getCustomerById(id: number): Observable<CustomerVM> {
    const url = environment.dataApiUrl + `/Customer/GetCustomerById/${id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<CustomerVM>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public addCustomer(data: CustomerVM): Observable<number> {
    const url = environment.dataApiUrl + `/Customer/AddCustomer`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public updateCustomer(data: CustomerVM): Observable<number> {
    const url = environment.dataApiUrl + `/Customer/UpdateCustomer`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .put<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public deleteCustomer(id: number): Observable<boolean> {
    const url = environment.dataApiUrl + `/Customer/DeleteCustomer/${id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<boolean>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
  //--------------------------------------------

  //------Estate api Services-------------------
  public getAllEstateForListView(): Observable<EstateListView[]> {
    const url = environment.dataApiUrl + `/Estate/GetAllEstateForListView`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<EstateListView[]>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllEstates(data: PageCollection): Observable<EstateCollection> {
    const url =
      environment.dataApiUrl +
      `/Estate/GetAllEstates?skip=${data.skip}&take=${data.take}&pageNumber=${data.pageNumber}&searchWord=${data.searchWord}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<EstateCollection>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getEstateById(id: number): Observable<EstateVM> {
    const url = environment.dataApiUrl + `/Estate/GetEstateById/${id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<EstateVM>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public addEstate(data: EstateVM): Observable<number> {
    const url = environment.dataApiUrl + `/Estate/AddEstate`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public updateEstate(data: EstateVM): Observable<number> {
    const url = environment.dataApiUrl + `/Estate/UpdateEstate`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .put<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public deleteEstate(id: number): Observable<boolean> {
    const url = environment.dataApiUrl + `/Estate/DeleteEstate/${id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<boolean>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
  //--------------------------------------------

  //------Estate Asset api Services-------------------
  public addEstateAsset(data: FormData): Observable<number> {
    const url = environment.dataApiUrl + `/EstateAsset/AddEstateAsset`;

    return this.httpClient.post<number>(url, data).pipe((res) => {
      const p = res || null;
      return p;
    });
  }

  public updateEstateAsset(data: FormData): Observable<number> {
    const url = environment.dataApiUrl + `/EstateAsset/UpdateEstateAsset`;

    return this.httpClient.post<number>(url, data).pipe((res) => {
      const p = res || null;
      return p;
    });
  }
  //--------------------------------------------

  //------My Estate api Services-------------------
  public getMyEstate(): Observable<MyEstateVM> {
    const url = environment.dataApiUrl + `/MyEstate/GetMyEstate`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<MyEstateVM>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public updateMyEstate(data: MyEstateVM): Observable<number> {
    const url = environment.dataApiUrl + `/MyEstate/UpdateMyEstate`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .put<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
  //--------------------------------------------

  //------Reports api Services-------------------
  public getLast10CustomersReport(): Observable<Last10Customer[]> {
    const url = environment.dataApiUrl + `/Report/GetLast10CustomersReport`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<Last10Customer[]>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public entityCounters(): Observable<EntityCounters> {
    const url = environment.dataApiUrl + `/Report/EntityCounters`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<EntityCounters>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
  //--------------------------------------------
}
