import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { CategoryList, FilterEnum } from '../../enums/categories.enum';
import { SlotService } from '../../services/slot.service';

@Component({
  selector: 'app-filter-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-slots.component.html',
  styleUrl: './filter-slots.component.scss'
})
export class FilterSlotsComponent implements OnInit {
  activeCategory: string;
  CategoryList = CategoryList;
  FilterEnum = FilterEnum;
  slotService = inject(SlotService);

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.callService();
  }

  callService() {
    this.slotService.getCategories().pipe(take(1)).subscribe(() => {
      const param = this.activatedRouter.snapshot.queryParams['category'];
      if (param) {
        this.slotService.categorySlots(param).pipe(take(1)).subscribe((_cat) => {
            this.activeCategory = param;
            this.slotService.activeFilter.set(FilterEnum.Category);
          });
      } else {
        this.chooseCategory(CategoryList.WebPopular)
      }
    });
  }
  chooseCategory(cat: string) {
    this.router.navigate([], { queryParams: { cat } }).then(() => {
      const gameData = this.slotService.categorySlotData().find((data) => data.category === cat);
      if (gameData) {
        console.log('aba', gameData);
        this.slotService.filteredSlots.set(gameData.games);
        this.activeCategory = cat;
        this.slotService.activeFilter.set(FilterEnum.Category);
      }
    });
  }

}
