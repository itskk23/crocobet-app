import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { FilterEnum } from '../../enums/categories.enum';
import { ProviderService } from '../../services/provider.service';
import { SlotService } from '../../services/slot.service';


@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent implements OnInit {
  slots$ = inject(SlotService);
  providers$ = inject(ProviderService).getAllProviders().pipe(map((result) => result.data));
  providerList = toSignal(this.providers$);
  openState = false;
  activeProvider: string;
  FilterEnum = FilterEnum;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {

  }

  ngOnInit() {
    console.log('rato ar shemodis');
    this.generateSlots();
  }

  generateSlots() {
    const param = this.activatedRouter.snapshot.queryParams['provider'];
    if (param) {
      this.slots$.providerSlots(param).pipe(take(1)).subscribe(() => {
        this.activeProvider = param;
        this.slots$.activeFilter.set(FilterEnum.Provider);
      });
    }
  }

  modifyProvider(provider: string): string | undefined {
    return this.providerList()?.find((prov) => prov.name == provider)?.provider;
  }

  chooseProvider(provider: string) {
    this.activeProvider = provider;
    this.slots$.activeFilter.set(FilterEnum.Provider);
    this.slots$.providerSlots(provider).pipe(take(1)).subscribe(() => {
      this.router.navigate([], { queryParams: { provider } });
    });
  }
}
