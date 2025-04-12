import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, inject, ViewChild } from '@angular/core';
import { BrushTool } from 'src/app/components/drawing/drawing-tools/brush-tool';
import { ToolbarComponent } from "../../components/drawing/toolbar/toolbar.component";
import { DrawableShape } from 'src/app/components/drawing/drawing-shapes/drawable-shape.interface';
import { RectangleTool } from 'src/app/components/drawing/drawing-tools/rectangle-tool';
import { BoundingBox, MousePosition } from './canvas.interface';
import { LoopService } from 'src/app/services/loop.service';

@Component({
  selector: 'app-canvas',
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
  standalone: true
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(ToolbarComponent, { static: true }) toolbar!: ToolbarComponent;

  private readonly EVENT_LOOP_FPS = 480;
  private readonly DRAW_LOOP_FPS = 240;

  private tool = computed(() => {
    switch (this.toolbar.tool()) {
      case 'brush':
        return new BrushTool('black', 2);

      case 'rectangle':
        return new RectangleTool('black', 2);

      default:
        return undefined;
    }
  });

  private readonly loopService = inject(LoopService);
  private ctx!: CanvasRenderingContext2D;
  private shapes: DrawableShape[] = [];
  private isDragging = false;

  private previousMousePos: MousePosition = { x: 0, y: 0 };

  protected latestMouseMove?: MouseEvent;
  protected latestMouseDown?: MouseEvent;
  protected latestMouseUp?: MouseEvent;

  ngAfterViewInit(): void {
    // Set size
    this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.loopService.add(() => this.processEvents(), 1000 / this.EVENT_LOOP_FPS, 0);
    this.loopService.add(() => this.draw(), 1000 / this.DRAW_LOOP_FPS, 1);
  }

  processEvents() {
    if (this.latestMouseDown) {
      this.onMouseDown(this.getMousePos(this.latestMouseDown));
      this.latestMouseDown = undefined;
    }

    if (this.latestMouseMove) {
      this.onMouseMove(this.getMousePos(this.latestMouseMove));
      this.latestMouseMove = undefined;
    }

    if (this.latestMouseUp) {
      this.onMouseUp(this.getMousePos(this.latestMouseUp));
      this.latestMouseUp = undefined;
    }
  }

  draw() {
    this.clearCanvas();
    this.ctx.fillStyle = 'black';
    this.shapes.forEach(shape => shape.draw(this.ctx));
    this.tool()?.getShape()?.draw(this.ctx);
  }

  onMouseDown(pos: MousePosition) {
    this.isDragging = true;
    this.tool()?.onMouseDown(pos);
  }

  onMouseMove(pos: MousePosition) {
    this.tool()?.onMouseMove(pos, this.isDragging);

    // Drag shapes
    this.canvas.nativeElement.style.cursor = 'default';
    if (!this.tool()) {
      const shape = this.shapes.find(shape => this.isInsideBoundingBox({ x: pos.x, y: pos.y }, shape.getBoundingBox()));
      if (shape) {
        this.canvas.nativeElement.style.cursor = 'pointer';
        if (this.isDragging) {
          const dx = pos.x - this.previousMousePos.x;
          const dy = pos.y - this.previousMousePos.y;
          shape.move(dx, dy);
        }
      }
    }

    this.previousMousePos = pos;
  }

  onMouseUp(pos: MousePosition) {
    this.isDragging = false;
    this.tool()?.onMouseUp(pos);
    const shape = this.tool()?.getShape();
    if (shape) {
      this.shapes.push(shape);
    }

    this.toolbar.deselectTool();
  }

  private clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  protected getMousePos(event: MouseEvent): MousePosition {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  private isInsideBoundingBox(mousePos: MousePosition, bbox: BoundingBox): boolean {
    return mousePos.x >= bbox.x 
      && mousePos.x <= bbox.x + bbox.width
      && mousePos.y >= bbox.y 
      && mousePos.y <= bbox.y + bbox.height;
  }
}