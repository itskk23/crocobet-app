import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvidersModel } from '../models/slot.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  url = 'https://cms.crocobet.com/integrations';
  constructor(private http:HttpClient) { }

  getAllProviders(): Observable<ProvidersModel> {
    const params = new HttpParams()
      .append('type', 'slot')
      .append('platform', 'desktop');
    return this.http.get<ProvidersModel>(this.url, { params });
  }
}
