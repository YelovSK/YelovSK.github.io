import { BoundingBox } from "src/app/pages/canvas/canvas.interface";

export interface DrawableShape {
    draw(ctx: CanvasRenderingContext2D): void;
    move(dx: number, dy: number): void;
    getBoundingBox(): BoundingBox;
}