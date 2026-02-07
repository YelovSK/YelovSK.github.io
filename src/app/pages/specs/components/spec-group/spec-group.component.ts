import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecItem, SpecGroup } from '../../specs.interfaces';

export interface ProcessedSpecGroup extends SpecGroup {
    activeItems: SpecItem[];
    obsoleteItems: SpecItem[];
    hasHistory: boolean;
}

@Component({
    selector: 'app-spec-group',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './spec-group.component.html',
    styles: [':host { display: block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecGroupComponent {
    @Input({ required: true }) spec!: ProcessedSpecGroup;

    isExpanded = signal(false);

    toggleExpand() {
        this.isExpanded.update(v => !v);
    }
}
