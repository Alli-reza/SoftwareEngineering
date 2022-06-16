import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ContractType,
  CustomerType,
  EstateType,
  DocumentType,
} from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private snackBar: MatSnackBar) {}

  documentTypeView(documentType: DocumentType): string {
    switch (documentType) {
      case DocumentType.Advocacy:
        return 'وکالتی';
      case DocumentType.HasDocument:
        return 'سند دار';
      case DocumentType.PromiseLetter:
        return 'قول نامه ای';
      default:
        return '';
    }
  }

  estateTypeView(estateType: EstateType): string {
    switch (estateType) {
      case EstateType.Apartment:
        return 'آپارتمان';
      case EstateType.Official:
        return 'اداری';
      case EstateType.Area:
        return 'زمین';
      case EstateType.Commercial:
        return 'تجاری';
      case EstateType.Villa:
        return 'ویلایی';
      case EstateType.Garden:
        return 'باغ';
      default:
        return '';
    }
  }

  customerTypeView(customerType: CustomerType): string {
    switch (customerType) {
      case CustomerType.Owner:
        return 'مالک';
      case CustomerType.Tenant:
        return 'مستاجر';
      default:
        return '';
    }
  }

  contractTypeView(contractType: ContractType): string {
    switch (contractType) {
      case ContractType.IntentionOfFullMortgage:
        return 'قصد رهن کامل';
      case ContractType.IntentionToBuy:
        return 'قصد خرید';
      case ContractType.IntentionToMortgageAndRent:
        return 'قصد رهن و اجاره';
      case ContractType.IntentionToRent:
        return 'قصد اجاره';
      case ContractType.IntentionToSell:
        return 'قصد فروش';
      default:
        return '';
    }
  }

  public sortBy(by: string | any, arr: any[], sorted: boolean): boolean {
    arr.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return sorted ? -1 : 1;
      }
      return 0;
    });
    return !sorted;
  }

  public notify(msg: string, action: string, duration: number = 3000): void {
    this.snackBar.open(msg, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
