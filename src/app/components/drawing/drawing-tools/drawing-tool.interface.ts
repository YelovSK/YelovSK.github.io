import { MousePosition } from "src/app/pages/canvas/canvas.interface";

export interface DrawingTool {
    onMouseDown(event: MousePosition): void;
    onMouseMove(event: MousePosition, isDragging: boolean): void;
    onMouseUp(event: MousePosition): void;

    onEnter?(): void;
    onExit?(): void;

    drawOverlay?(ctx: CanvasRenderingContext2D): void;
    getCursor(event: MousePosition): string;
}