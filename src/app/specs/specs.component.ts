import { Component } from '@angular/core';
import { SpecGroup } from './specs.interfaces';
import { SPECS } from './specs.data';

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css'],
})
export class SpecsComponent {
  readonly SPECS = SPECS;
  readonly OBSOLETE = '[OBSOLETE]';

  ngOnInit() {
    SPECS.forEach(spec => spec.items = spec.items.sort((a, b) => a.isObsolete && !b.isObsolete ? 1 : -1))
  }

  public getSpecDescription(spec: SpecGroup): string {
    if (spec.items.length === 1) {
      const item = spec.items[0];
      return item.name + (item.isObsolete ? ' [OBSOLETE]' : '');
    } else {
      return spec.items.filter(item => !item.isObsolete).map((item) => item.name).join(' | ');
    }
  }
}
