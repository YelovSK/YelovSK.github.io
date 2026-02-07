import { Component, computed, signal } from '@angular/core';
import { SPECS } from './specs.data';
import { CommonModule } from '@angular/common';
import { SpecGroupComponent } from './components/spec-group/spec-group.component';

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css'],
  imports: [CommonModule, SpecGroupComponent],
  standalone: true
})
export class SpecsComponent {

  // No longer need expandedHistory here as it's managed by child component

  readonly sortedSPECS = computed(() =>
    SPECS.map(spec => {
      // Split items into active and obsolete
      const active = spec.items.filter(i => !i.isObsolete);
      const obsolete = spec.items.filter(i => i.isObsolete);

      return {
        ...spec,
        activeItems: active,
        obsoleteItems: obsolete,
        hasHistory: obsolete.length > 0
      };
    })
  );
}
