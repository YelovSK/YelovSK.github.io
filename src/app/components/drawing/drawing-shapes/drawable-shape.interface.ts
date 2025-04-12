export interface DrawableShape {
    draw(ctx: CanvasRenderingContext2D): void;
    move(dx: number, dy: number): void;
    getBoundingBox(): { x: number, y: number, width: number, height: number };
}