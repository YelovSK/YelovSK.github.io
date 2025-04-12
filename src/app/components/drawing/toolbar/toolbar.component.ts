import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Output, signal } from '@angular/core';

export type Tool = 'brush' | 'rectangle';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public tool = signal<Tool | null>(null);
  public brushSelected = computed(() => this.tool() === 'brush');
  public rectangleSelected = computed(() => this.tool() === 'rectangle');

  setBrushTool() {
    this.tool.set('brush');
  }

  setRectangleTool() {
    this.tool.set('rectangle');
  }

  deselectTool() {
    this.tool.set(null);
  }
}
