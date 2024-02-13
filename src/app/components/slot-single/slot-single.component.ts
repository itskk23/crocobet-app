import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slot-single',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './slot-single.component.html',
  styleUrl: './slot-single.component.scss'
})
export class SlotSingleComponent {
  @Input() url: string;
  @Input() name: string; 
  @Input() tags: string[] = ['new', 'jackpot'];
  constructor() {
    
  }
}
