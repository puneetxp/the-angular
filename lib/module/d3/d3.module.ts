import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Component } from './d3.component';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [D3Component, BarComponent, LineComponent]
})
export class D3Module { }
