import { MousePosition } from 'src/app/pages/canvas/canvas.interface';
import { RectangleShape } from '../drawing-shapes/rectangle-shape';
import { DrawingTool } from './drawing-tool.interface';
import { SceneService } from 'src/app/services/scene.service';

import { DrawingOptionsService } from "src/app/services/drawing-options.service";

export class RectangleTool implements DrawingTool {
    private startX = 0;
    private startY = 0;
    private currentRect?: RectangleShape;

    constructor(private sceneService: SceneService, private drawingOptions: DrawingOptionsService) { }

    onMouseDown(pos: MousePosition): void {
        this.startX = pos.x;
        this.startY = pos.y;
        this.currentRect = new RectangleShape(pos.x, pos.y, 0, 0, this.drawingOptions.color(), this.drawingOptions.lineWidth());
    }

    onMouseMove(pos: MousePosition, isDragging: boolean): void {
        if (!isDragging) return;

        this.currentRect!.width = pos.x - this.startX;
        this.currentRect!.height = pos.y - this.startY;
    }

    onMouseUp(event: MousePosition): void {
        if (this.currentRect) {
            this.sceneService.addShape(this.currentRect);
            this.currentRect = undefined;
        }
    }

    drawOverlay(ctx: CanvasRenderingContext2D): void {
        if (this.currentRect) {
            this.currentRect.draw(ctx);
        }
    }

    getCursor(pos: MousePosition): string {
        return 'crosshair';
    }
}
