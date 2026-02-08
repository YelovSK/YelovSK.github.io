import { MousePosition } from "src/app/pages/canvas/canvas.interface";
import { Brush } from "../drawing-shapes/brush-shape";
import { DrawingTool } from "./drawing-tool.interface";
import { DrawingOptionsService } from "src/app/services/drawing-options.service";
import { SceneService } from "src/app/services/scene.service";

export class BrushTool implements DrawingTool {
  private currentStroke?: Brush;

  constructor(private sceneService: SceneService, private drawingOptions: DrawingOptionsService) { }

  onMouseDown(pos: MousePosition): void {
    this.currentStroke = new Brush(this.drawingOptions.color(), this.drawingOptions.lineWidth());
    this.currentStroke.addPoint(pos.x, pos.y);
  }

  onMouseMove(pos: MousePosition, isDragging: boolean): void {
    if (!isDragging) return;

    this.currentStroke!.addPoint(pos.x, pos.y);
  }

  onMouseUp(event: MousePosition): void {
    if (this.currentStroke) {
      this.sceneService.addShape(this.currentStroke);
      this.currentStroke = undefined;
    }
  }

  drawOverlay(ctx: CanvasRenderingContext2D): void {
    if (this.currentStroke) {
      this.currentStroke.draw(ctx);
    }
  }

  getCursor(pos: MousePosition): string {
    return 'crosshair';
  }
}