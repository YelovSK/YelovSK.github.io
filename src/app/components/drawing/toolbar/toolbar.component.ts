import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ToolService } from 'src/app/services/tool.service';
import { DrawingOptionsService } from 'src/app/services/drawing-options.service';

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
  private toolService = inject(ToolService);
  private drawingOptions = inject(DrawingOptionsService);

  public tool = this.toolService.activeToolName;
  public brushSelected = computed(() => this.tool() === 'brush');
  public rectangleSelected = computed(() => this.tool() === 'rectangle');
  public selectSelected = computed(() => this.tool() === 'select');

  public color = this.drawingOptions.color;
  public lineWidth = this.drawingOptions.lineWidth;

  setBrushTool() {
    this.toolService.selectTool('brush');
  }

  setRectangleTool() {
    this.toolService.selectTool('rectangle');
  }

  setSelectTool() {
    this.toolService.selectTool('select');
  }

  onColorChange(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.drawingOptions.setColor(color);
  }

  onLineWidthChange(event: Event) {
    const width = Number((event.target as HTMLInputElement).value);
    this.drawingOptions.setLineWidth(width);
  }
}
