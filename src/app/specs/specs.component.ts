import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

interface Spec {
  title: string;
  description: string;
  expanded: boolean;
}

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css'],
  animations: [
    trigger('expand', [
      state('true', style({ opacity: 1, height: '*' })),
      state('false', style({ opacity: 0, height: 0 })),
      transition('false <=> true', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SpecsComponent {
  specs: Spec[] = [
    { title: 'GPU', description: 'Graphics Processing Unit', expanded: false },
    { title: 'CPU', description: 'Central Processing Unit', expanded: false },
  ];

  toggleSpec(spec: Spec) {
    spec.expanded = !spec.expanded;
  }
}
