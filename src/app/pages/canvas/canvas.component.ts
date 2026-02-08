import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, signal, ViewChild } from '@angular/core';
import { BrushTool } from 'src/app/components/drawing/drawing-tools/brush-tool';
import { ToolbarComponent } from "../../components/drawing/toolbar/toolbar.component";
import { RectangleTool } from 'src/app/components/drawing/drawing-tools/rectangle-tool';
import { MousePosition } from './canvas.interface';
import { LoopService } from 'src/app/services/loop.service';
import { SceneService } from 'src/app/services/scene.service';
import { ToolService } from 'src/app/services/tool.service';
import { SelectTool } from 'src/app/components/drawing/drawing-tools/select-tool';

import { DrawingOptionsService } from 'src/app/services/drawing-options.service';

@Component({
  selector: 'app-canvas',
  imports: [ToolbarComponent],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(ToolbarComponent, { static: true }) toolbar!: ToolbarComponent;

  private readonly EVENT_LOOP_FPS = 480;
  private readonly DRAW_LOOP_FPS = 240;

  private readonly loopService = inject(LoopService);
  private readonly sceneService = inject(SceneService);
  private readonly toolService = inject(ToolService);
  private readonly drawingOptions = inject(DrawingOptionsService);
  private readonly ngZone = inject(NgZone);

  private ctx!: CanvasRenderingContext2D;
  private isDragging = false;

  protected latestMouseMove?: MouseEvent;
  protected latestMouseDown?: MouseEvent;
  protected latestMouseUp?: MouseEvent;

  protected readonly fps = signal(0);
  private frameCount = 0;
  private lastFpsUpdate = 0;

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.registerTools();

    this.loopService.add(() => this.processEvents(), 1000 / this.EVENT_LOOP_FPS, 0);
    this.loopService.add(() => this.draw(), 1000 / this.DRAW_LOOP_FPS, 1);

    const resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    resizeObserver.observe(this.canvas.nativeElement);
  }

  private registerTools() {
    this.toolService.registerTool('select', new SelectTool(this.sceneService));
    this.toolService.registerTool('brush', new BrushTool(this.sceneService, this.drawingOptions));
    this.toolService.registerTool('rectangle', new RectangleTool(this.sceneService, this.drawingOptions));

    this.toolService.selectTool('select');
  }

  resizeCanvas() {
    const canvasEl = this.canvas.nativeElement;

    const width = canvasEl.clientWidth;
    const height = canvasEl.clientHeight;

    if (canvasEl.width !== width || canvasEl.height !== height) {
      canvasEl.width = width;
      canvasEl.height = height;
    }
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
    this.calculateFps();
    this.clearCanvas();
    this.ctx.fillStyle = 'black';

    this.sceneService.shapes().forEach(shape => shape.draw(this.ctx));
    this.toolService.activeTool()?.drawOverlay?.(this.ctx);
  }

  private calculateFps() {
    const now = performance.now();
    this.frameCount++;

    if (now - this.lastFpsUpdate >= 500) {
      const currentFps = Math.round(this.frameCount * 1000 / (now - this.lastFpsUpdate));
      this.ngZone.run(() => {
        this.fps.set(currentFps);
      });
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }
  }

  onMouseDown(pos: MousePosition) {
    this.isDragging = true;
    this.toolService.activeTool()?.onMouseDown(pos);
  }

  onMouseMove(pos: MousePosition) {
    this.toolService.activeTool()?.onMouseMove(pos, this.isDragging);

    const cursor = this.toolService.activeTool()?.getCursor(pos) ?? 'default';
    this.canvas.nativeElement.style.cursor = cursor;

    this.latestMouseMove = undefined;
  }

  onMouseUp(pos: MousePosition) {
    this.isDragging = false;
    this.toolService.activeTool()?.onMouseUp(pos);
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
}
