import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliPipe } from './jalali.pipe';
import { StringCutterPipe } from './string-cutter.pipe';

@NgModule({
  declarations: [JalaliPipe, StringCutterPipe],
  imports: [CommonModule],
  exports: [JalaliPipe, StringCutterPipe],
})
export class HelperPipesModule {}
