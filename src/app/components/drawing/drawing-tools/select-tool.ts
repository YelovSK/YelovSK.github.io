import { MousePosition } from "src/app/pages/canvas/canvas.interface";
import { DrawingTool } from "./drawing-tool.interface";
import { SceneService } from "src/app/services/scene.service";
import { DrawableShape } from "../drawing-shapes/drawable-shape.interface";
import { BoundingBox } from "src/app/pages/canvas/canvas.interface";

export class SelectTool implements DrawingTool {
    private draggingShape: DrawableShape | undefined;
    private previousMousePos: MousePosition = { x: 0, y: 0 };
    private hoveredShapes: DrawableShape[] = [];

    constructor(private sceneService: SceneService) { }

    onMouseDown(pos: MousePosition): void {
        const shape = this.hoveredShapes.length > 0
            ? this.hoveredShapes[0]
            : undefined;

        if (shape) {
            this.draggingShape = shape;
            this.previousMousePos = pos;
        }
    }

    onMouseMove(pos: MousePosition, isDragging: boolean): void {
        this.hoveredShapes = this.getHoveredShapes(pos);

        if (this.draggingShape && isDragging) {
            const dx = pos.x - this.previousMousePos.x;
            const dy = pos.y - this.previousMousePos.y;
            this.draggingShape.move(dx, dy);
        }

        this.previousMousePos = pos;
    }

    onMouseUp(pos: MousePosition): void {
        this.draggingShape = undefined;
    }

    drawOverlay(ctx: CanvasRenderingContext2D): void {
        this.hoveredShapes.forEach(shape => {
            const bbox = shape.getBoundingBox();
            const isDragged = shape === this.draggingShape;
            ctx.strokeStyle = isDragged ? 'blue' : 'green';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
            ctx.setLineDash([]);
        });
    }

    getCursor(pos: MousePosition): string {
        if (this.draggingShape) {
            return 'grabbing';
        }

        return this.hoveredShapes.length > 0 ? 'grab' : 'default';
    }

    private isInsideBoundingBox(mousePos: MousePosition, bbox: BoundingBox): boolean {
        return mousePos.x >= bbox.x
            && mousePos.x <= bbox.x + bbox.width
            && mousePos.y >= bbox.y
            && mousePos.y <= bbox.y + bbox.height;
    }

    private getHoveredShapes(pos: MousePosition): DrawableShape[] {
        return this.sceneService.shapes().filter(shape =>
            this.isInsideBoundingBox(pos, shape.getBoundingBox())
        );
    }
}
