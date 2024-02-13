import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CategoryIcons, CategoryList, CategoryNameList, FilterEnum } from '../enums/categories.enum';
import { ISlotModel, ProviderSlotsModel, SlotModel, SlotModelArray, SlotTypeModel } from '../models/slot.model';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  url1 = 'https://cms.crocobet.com/integrations/v2/slot/categories';
  url2 = 'https://cms.crocobet.com/integrations/v2/slot/providers';
  categorySlotData: WritableSignal<SlotTypeModel[]> = signal([]);
  filteredSlots: WritableSignal<ISlotModel[]> = signal([]);
  activeFilter: WritableSignal<FilterEnum> = signal(FilterEnum.Category);
  constructor(private http: HttpClient) {
  }
  
  getCategories(): Observable<SlotTypeModel[]> {
    const params = new HttpParams().append('include', 'games');
    return this.http.get<SlotModelArray>(this.url1, { params }).pipe(
        map((result: any) => {
          return result.data.filter((result) => {
              return (
                result.category == CategoryList.WebPopular ||
                result.category == CategoryList.Favorites ||
                result.category == CategoryList.NewGames ||
                result.category == CategoryList.BuyBonus ||
                result.category == CategoryList.History
              );
            }).map((data: any) => {
              console.log('data gaifiltra?', data)
              return {
                ...data,
                name: CategoryNameList[data.category as keyof typeof CategoryNameList],
                icon: CategoryIcons[data.category as keyof typeof CategoryIcons],
              };
            });
        }),
        tap((res) => {
          this.categorySlotData.set(res)
        })
      );
  }

  categorySlots(category: string): Observable<ISlotModel[]> {
    const params = new HttpParams().append('include', 'games');
    return this.http.get<SlotModel>(`${this.url1}/${category}`, { params }).pipe(
        map((result) => result.data.games),
        tap((slots) => this.filteredSlots.set(slots))
      );
  }

  providerSlots(provider: string): Observable<ISlotModel[]> {
    return this.http.get<ProviderSlotsModel>(`${this.url2}/${provider}`).pipe(
        map((result) => result.data.games),
        tap((slots) => {
          this.filteredSlots.set(slots);
        })
      );
  }
}
