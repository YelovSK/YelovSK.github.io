import { Component, computed } from '@angular/core';
import { SPECS } from './specs.data';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css'],
  imports: [MatExpansionModule, CommonModule],
  standalone: true
})
export class SpecsComponent {
  readonly OBSOLETE = '[OBSOLETE]';

  readonly sortedSPECS = computed(() =>
    SPECS.map(spec => ({
      ...spec,
      items: [...spec.items].sort((a, b) => (a.isObsolete && !b.isObsolete ? 1 : -1)),
      description:
        spec.items.length === 1
          ? spec.items[0].name + (spec.items[0].isObsolete ? ` ${this.OBSOLETE}` : '')
          : spec.items.filter(item => !item.isObsolete).map(item => item.name).join(' | ')
    }))
  );
}
