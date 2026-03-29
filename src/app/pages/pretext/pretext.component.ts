import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { layoutNextLine, prepareWithSegments, type LayoutCursor, type PreparedTextWithSegments } from '@chenglou/pretext';

type RenderedLine = {
  text: string;
  x: number;
  y: number;
  width: number;
};

type Slot = {
  left: number;
  right: number;
};

type GlyphProfile = {
  rows: Slot[][];
  aspectRatio: number;
  widthScale: number;
  heightScale: number;
  src: string;
};

type GlyphBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  src: string;
};

const BODY_TEXT = 'A'.repeat(250000);
const BODY_FONT_FAMILY = 'Georgia, "Times New Roman", serif';
const GLYPH_FONT_FAMILY = 'Georgia, "Times New Roman", serif';
const MOBILE_BREAKPOINT = 720;

@Component({
  selector: 'app-pretext',
  standalone: true,
  imports: [],
  templateUrl: './pretext.component.html',
  styleUrl: './pretext.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PretextComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stage', { static: true }) private readonly stageRef?: ElementRef<HTMLDivElement>;

  readonly lines = signal<RenderedLine[]>([]);
  readonly glyph = signal<GlyphBox>({ x: 0, y: 0, width: 0, height: 0, fontSize: 0, src: '' });

  private readonly preparedByFont = new Map<string, PreparedTextWithSegments>();
  private readonly profileBySize = new Map<number, GlyphProfile>();
  private resizeObserver?: ResizeObserver;
  private pointer = { x: 0, y: 0 };

  async ngAfterViewInit(): Promise<void> {
    if ('fonts' in document) {
      await document.fonts.ready;
    }

    const stage = this.stageRef?.nativeElement;
    if (!stage) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.render());
    this.resizeObserver.observe(stage);

    const rect = stage.getBoundingClientRect();
    this.pointer = { x: rect.width * 0.65, y: rect.height * 0.35 };
    this.render();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  onPointerMove(event: MouseEvent): void {
    const stage = this.stageRef?.nativeElement;
    if (!stage) {
      return;
    }

    const rect = stage.getBoundingClientRect();
    this.pointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    this.render();
  }

  private render(): void {
    const stage = this.stageRef?.nativeElement;
    if (!stage) {
      return;
    }

    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }

    const compact = width < MOBILE_BREAKPOINT;
    const gutter = compact ? 16 : 24;
    const fontSize = compact ? 18 : 24;
    const lineHeight = compact ? 20 : 26;
    const font = `400 ${fontSize}px ${BODY_FONT_FAMILY}`;
    const prepared = this.getPrepared(font);

    const glyphFontSize = compact ? Math.min(180, width * 0.32) : Math.min(320, width * 0.34);
    const profile = this.getGlyphProfile(Math.round(glyphFontSize));
    const glyphWidth = Math.round(profile.widthScale * glyphFontSize);
    const glyphHeight = Math.round(profile.heightScale * glyphFontSize);
    const glyph: GlyphBox = {
      x: Math.round(this.clamp(this.pointer.x - glyphWidth / 2, gutter, width - gutter - glyphWidth)),
      y: Math.round(this.clamp(this.pointer.y - glyphHeight / 2, gutter, height - gutter - glyphHeight)),
      width: glyphWidth,
      height: glyphHeight,
      fontSize: glyphFontSize,
      src: profile.src,
    };

    const lines: RenderedLine[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let top = gutter;

    while (top + lineHeight <= height - gutter) {
      const slots = this.getSlots(width, glyph, profile, top, top + lineHeight, compact ? 8 : 10, compact ? 4 : 6);
      for (const slot of slots) {
        const line = layoutNextLine(prepared, cursor, slot.right - slot.left);
        if (line === null) {
          this.lines.set(lines);
          this.glyph.set(glyph);
          return;
        }

        lines.push({
          text: line.text,
          x: Math.round(slot.left),
          y: Math.round(top),
          width: Math.ceil(line.width),
        });
        cursor = line.end;
      }

      top += lineHeight;
    }

    this.lines.set(lines);
    this.glyph.set(glyph);
  }

  private getPrepared(font: string): PreparedTextWithSegments {
    const cached = this.preparedByFont.get(font);
    if (cached !== undefined) {
      return cached;
    }

    const prepared = prepareWithSegments(BODY_TEXT, font);
    this.preparedByFont.set(font, prepared);
    return prepared;
  }

  private getSlots(width: number, glyph: GlyphBox, profile: GlyphProfile, bandTop: number, bandBottom: number, horizontalPadding: number, verticalPadding: number): Slot[] {
    const left = width < MOBILE_BREAKPOINT ? 16 : 24;
    const right = width - left;
    const blocked = this.getBlockedIntervals(glyph, profile, bandTop, bandBottom, horizontalPadding, verticalPadding);

    if (blocked.length === 0) {
      return [{ left, right }];
    }

    let slots: Slot[] = [{ left, right }];

    for (const interval of blocked) {
      const next: Slot[] = [];
      for (const slot of slots) {
        if (interval.right <= slot.left || interval.left >= slot.right) {
          next.push(slot);
          continue;
        }

        if (interval.left - slot.left >= 12) {
          next.push({ left: slot.left, right: interval.left });
        }
        if (slot.right - interval.right >= 12) {
          next.push({ left: interval.right, right: slot.right });
        }
      }
      slots = next;
    }

    return slots.length > 0 ? slots : [{ left, right }];
  }

  private getBlockedIntervals(glyph: GlyphBox, profile: GlyphProfile, bandTop: number, bandBottom: number, horizontalPadding: number, verticalPadding: number): Slot[] {
    const top = bandTop - verticalPadding;
    const bottom = bandBottom + verticalPadding;
    const startRow = Math.max(0, Math.floor(((top - glyph.y) / glyph.height) * profile.rows.length));
    const endRow = Math.min(profile.rows.length - 1, Math.ceil(((bottom - glyph.y) / glyph.height) * profile.rows.length));

    if (endRow < 0 || startRow >= profile.rows.length) {
      return [];
    }

    const blocked: Slot[] = [];

    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
      const row = profile.rows[rowIndex];
      if (!row) {
        continue;
      }

      for (const interval of row) {
        blocked.push({
          left: glyph.x + interval.left * glyph.width - horizontalPadding,
          right: glyph.x + interval.right * glyph.width + horizontalPadding,
        });
      }
    }

    blocked.sort((a, b) => a.left - b.left);

    const merged: Slot[] = [];
    for (const interval of blocked) {
      const last = merged[merged.length - 1];
      if (last === undefined || interval.left > last.right) {
        merged.push({ ...interval });
        continue;
      }
      last.right = Math.max(last.right, interval.right);
    }

    return merged;
  }

  private getGlyphProfile(size: number): GlyphProfile {
    const cached = this.profileBySize.get(size);
    if (cached !== undefined) {
      return cached;
    }

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(220, Math.round(size * 1.1));
    canvas.height = Math.max(280, Math.round(size * 1.2));
    const context = canvas.getContext('2d');
    if (context === null) {
      const fallback = {
        rows: new Array(64).fill([{ left: 0.18, right: 0.82 }]),
        aspectRatio: 0.64,
        widthScale: 0.64,
        heightScale: 1,
        src: '',
      };
      this.profileBySize.set(size, fallback);
      return fallback;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#e4e4e7';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `900 ${size}px ${GLYPH_FONT_FAMILY}`;
    context.fillText('A', canvas.width / 2, canvas.height / 2 + size * 0.03);

    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let boundLeft = Infinity;
    let boundRight = -Infinity;
    let boundTop = Infinity;
    let boundBottom = -Infinity;
    const rawRows: Slot[][] = new Array(canvas.height).fill(null).map(() => []);

    for (let y = 0; y < canvas.height; y++) {
      let runStart = -1;
      for (let x = 0; x < canvas.width; x++) {
        const opaque = data[(y * canvas.width + x) * 4 + 3] >= 20;
        if (opaque) {
          if (runStart === -1) {
            runStart = x;
          }
          continue;
        }

        if (runStart !== -1) {
          rawRows[y]!.push({ left: runStart, right: x });
          runStart = -1;
        }
      }

      if (runStart !== -1) {
        rawRows[y]!.push({ left: runStart, right: canvas.width });
      }

      if (rawRows[y]!.length > 0) {
        boundLeft = Math.min(boundLeft, rawRows[y]![0]!.left);
        boundRight = Math.max(boundRight, rawRows[y]![rawRows[y]!.length - 1]!.right);
        boundTop = Math.min(boundTop, y);
        boundBottom = Math.max(boundBottom, y + 1);
      }
    }

    const boundWidth = Math.max(1, boundRight - boundLeft);
    const boundHeight = Math.max(1, boundBottom - boundTop);
    const rows: Slot[][] = [];

    for (let y = boundTop; y < boundBottom; y++) {
      rows.push(
        rawRows[y]!.map(interval => ({
          left: (interval.left - boundLeft) / boundWidth,
          right: (interval.right - boundLeft) / boundWidth,
        }))
      );
    }

    const trimmedWidth = Math.max(1, Math.round(boundWidth));
    const trimmedHeight = Math.max(1, Math.round(boundHeight));
    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight;
    const trimmedContext = trimmedCanvas.getContext('2d');
    if (trimmedContext !== null) {
      trimmedContext.drawImage(
        canvas,
        boundLeft,
        boundTop,
        boundWidth,
        boundHeight,
        0,
        0,
        trimmedWidth,
        trimmedHeight,
      );
    }

    const profile = {
      rows,
      aspectRatio: boundWidth / boundHeight,
      widthScale: boundWidth / size,
      heightScale: boundHeight / size,
      src: trimmedCanvas.toDataURL('image/png'),
    };
    this.profileBySize.set(size, profile);
    return profile;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
