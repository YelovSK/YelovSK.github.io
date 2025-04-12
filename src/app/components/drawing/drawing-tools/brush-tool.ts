import { MousePosition } from "src/app/pages/canvas/canvas.interface";
import { Brush } from "../drawing-shapes/brush-shape";
import { DrawableShape } from "../drawing-shapes/drawable-shape.interface";
import { DrawingTool } from "./drawing-tool.interface";

export class BrushTool implements DrawingTool {
  private currentStroke?: Brush;

  constructor(private color: string, private lineWidth: number) { }

  onMouseDown(pos: MousePosition): void {
    this.currentStroke = new Brush(this.color, this.lineWidth);
    this.currentStroke.addPoint(pos.x, pos.y);
  }

  onMouseMove(pos: MousePosition, isDragging: boolean): void {
    if (!isDragging) return;

    this.currentStroke!.addPoint(pos.x, pos.y);
  }

  onMouseUp(event: MousePosition): void {
  }

  getShape(): DrawableShape | undefined {
    return this.currentStroke;
  }
}