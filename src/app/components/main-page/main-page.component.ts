import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FilterSlotsComponent } from '../filter-slots/filter-slots.component';
import { ProvidersComponent } from '../providers/providers.component';
import { SlotListComponent } from '../slot-list/slot-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HeaderComponent,
    NavbarComponent,
    FilterSlotsComponent,
    ProvidersComponent,
    SlotListComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  constructor(){
    
  }
}
