import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecGroupComponent } from './components/spec-group/spec-group.component';
import { HttpClient } from '@angular/common/http';
import { ProcessedSpecGroup, SpecGroup } from './specs.interfaces';
import { catchError, map, Observable, shareReplay, tap } from 'rxjs';
import { Constants } from 'src/app/common/constants';
import { ToastService } from 'src/app/services/toast.service';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css'],
  imports: [CommonModule, SpecGroupComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecsComponent {
  private readonly DOG_BIRTH_DATE = dayjs('2013-05-18');
  private readonly GIST = 'https://gist.githubusercontent.com/YelovSK/5587ec44bb8d2b0a83a0144b2abf6286/raw/specs.json';
  
  private readonly client = inject(HttpClient);
  private readonly toast = inject(ToastService);

  constructor() {
    dayjs.extend(duration);
  }

  // Hosted on gist so that I don't have to re-deploy to update a typo
  readonly specs$: Observable<ProcessedSpecGroup[]> = this.client.get<SpecGroup[]>(this.GIST).pipe(
    map(response => this.hydrateSpecs(response)),
    map(groups => groups.map(group => ({
      ...group,
      activeItems: group.items.filter(i => !i.isObsolete),
      obsoleteItems: group.items.filter(i => i.isObsolete),
    }))),
    catchError(error => {
      console.error('Failed to load specs data', error);
      this.toast.error('Failed to load specs data');
      return [];
    }),
    shareReplay(1),
  );

  // Unfortunately there's some dynamic stuff in the JSON
  private hydrateSpecs(groups: SpecGroup[]): SpecGroup[] {
    const dogAge = this.calculateDogAge();

    return groups.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        description: item.description.replace('{{DOG_AGE}}', dogAge),
        image: item.image
          ? (Constants.Assets as any)[item.image]
          : undefined
      }))
    }));
  }

  private calculateDogAge(): string {
    const now = dayjs();

    const years = now.diff(this.DOG_BIRTH_DATE, 'year');
    const afterYears = this.DOG_BIRTH_DATE.add(years, 'year');

    const months = now.diff(afterYears, 'month');
    const afterMonths = afterYears.add(months, 'month');

    const days = now.diff(afterMonths, 'day');

    return `${years} years ${months} months ${days} days`.trim();
  }
}
