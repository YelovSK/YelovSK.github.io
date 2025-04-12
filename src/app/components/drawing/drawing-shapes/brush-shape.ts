import { DrawableShape } from "./drawable-shape.interface";

export class Brush implements DrawableShape {
    private points: { x: number, y: number }[] = [];

    constructor(public color: string, public lineWidth: number) {
    }

    addPoint(x: number, y: number) {
        this.points.push({ x, y });
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.points.length < 2) return;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let point of this.points.slice(1)) {
            ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();
    }

    move(dx: number, dy: number): void {
        for (let point of this.points) {
            point.x += dx;
            point.y += dy;
        }
    }

    getBoundingBox(): { x: number; y: number; width: number; height: number; } {
        const minX = Math.min(...this.points.map(p => p.x));
        const minY = Math.min(...this.points.map(p => p.y));
        const maxX = Math.max(...this.points.map(p => p.x));
        const maxY = Math.max(...this.points.map(p => p.y));

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }
}
