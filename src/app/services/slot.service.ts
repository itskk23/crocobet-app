import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CategoryIcons, CategoryNameList, FilterEnum } from '../enums/categories.enum';
import { ISlotModel, ProviderSlotsModel, ProvidersModel, SlotModel, SlotModelArray, SlotTypeModel } from '../models/slot.model';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  url1 = 'https://cms.crocobet.com/integrations/v2/slot/categories';
  url2 = 'https://cms.crocobet.com/integrations/v2/slot/providers';
  url3 = 'https://cms.crocobet.com/integrations';

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
                result.category == 'web:popular' || result.category == 'Web|Mob:search' ||
                result.category == 'web:new_games' || result.category == 'web:buy_bonus' ||
                result.category == 'web:new_provider'
              )}).map((data: any) => {
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

  getAllProviders(): Observable<ProvidersModel> {
    const params = new HttpParams()
      .append('type', 'slot')
      .append('platform', 'desktop');
    return this.http.get<ProvidersModel>(this.url3, { params });
  }
}
