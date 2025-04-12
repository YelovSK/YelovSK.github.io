import { DrawableShape } from "./drawable-shape.interface";

export class RectangleShape implements DrawableShape {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
        public lineWidth: number,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    getBoundingBox() {
        const width = Math.abs(this.width);
        const height = Math.abs(this.height);

        const x = this.width < 0 ? this.x + this.width : this.x;
        const y = this.height < 0 ? this.y + this.height : this.y;

        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }
}
