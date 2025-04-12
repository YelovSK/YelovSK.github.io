import { MousePosition } from 'src/app/pages/canvas/canvas.interface';
import { RectangleShape } from '../drawing-shapes/rectangle-shape';
import { DrawingTool } from './drawing-tool.interface';

export class RectangleTool implements DrawingTool<RectangleShape> {
    private startX = 0;
    private startY = 0;
    private currentRect?: RectangleShape;

    constructor(private color: string, private lineWidth: number) { }

    onMouseDown(pos: MousePosition): void {
        this.startX = pos.x;
        this.startY = pos.y;
        this.currentRect = new RectangleShape(pos.x, pos.y, 0, 0, this.color, this.lineWidth);
    }

    onMouseMove(pos: MousePosition, isDragging: boolean): void {
        if (!isDragging) return;

        this.currentRect!.width = pos.x - this.startX;
        this.currentRect!.height = pos.y - this.startY;
    }

    onMouseUp(event: MousePosition): void {
    }

    getShape(): RectangleShape | undefined {
        return this.currentRect;
    }
}
