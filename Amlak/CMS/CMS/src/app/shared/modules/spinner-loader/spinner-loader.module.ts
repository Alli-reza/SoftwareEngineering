import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoaderComponent } from './spinner-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SpinnerLoaderComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerLoaderComponent],
})
export class SpinnerLoaderModule {}
