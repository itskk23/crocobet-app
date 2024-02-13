import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SlotService } from '../../services/slot.service';
import { SlotSingleComponent } from '../slot-single/slot-single.component';

@Component({
  selector: 'app-slot-list',
  standalone: true,
  imports: [CommonModule, SlotSingleComponent],
  templateUrl: './slot-list.component.html',
  styleUrl: './slot-list.component.scss'
})
export class SlotListComponent {
  slotService = inject(SlotService);
  constructor() {
    
  }
}
