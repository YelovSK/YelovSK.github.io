import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  isCollapsed = signal(false);

  toggleCollapse() {
    this.isCollapsed.update(v => !v);
  }

  navItems = [
    { path: '/', label: 'Home', icon: 'home', exact: true },
    { path: '/specs', label: 'Specs', icon: 'memory' },
    { path: '/software', label: 'Software', icon: 'terminal' },
    { path: '/click', label: 'Click', icon: 'mouse' },
    { path: '/word', label: 'Word', icon: 'font_download' },
    { path: '/canvas', label: 'Canvas', icon: 'brush' },
    { path: '/pretext', label: 'Pretext', icon: 'text_fields' },
  ];
}
