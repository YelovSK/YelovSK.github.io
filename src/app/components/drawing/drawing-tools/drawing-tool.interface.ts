import { MousePosition } from "src/app/pages/canvas/canvas.interface";
import { DrawableShape } from "../drawing-shapes/drawable-shape.interface";

export interface DrawingTool<T extends DrawableShape = DrawableShape> {
    onMouseDown(event: MousePosition): void;
    onMouseMove(event: MousePosition, isDragging: boolean): void;
    onMouseUp(event: MousePosition): void;
    getShape(): T | undefined;
}