import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClickComponent implements AfterViewInit {
  @ViewChild('rat', { static: true }) rat!: ElementRef<HTMLImageElement>;
  @ViewChild('arena', { static: true }) arena!: ElementRef<HTMLDivElement>;

readonly score = signal(0);
  readonly isJumping = signal(true);
  readonly intervalMs = signal(1000);
  readonly position = signal({ top: 0, left: 0 });

  readonly image = computed(() =>
    this.isJumping() ? Constants.Assets.XDD : Constants.Assets.DDX
  );

  constructor() {
    effect((onCleanup) => {
      if (!this.isJumping()) return;

      const intervalId = setInterval(() => {
        this.randomizePosition();
      }, this.intervalMs());

      onCleanup(() => clearInterval(intervalId));
    });
  }

  ngAfterViewInit() {
    this.randomizePosition();
  }

  onImageClick() {
    if (this.isJumping()) {
      this.stopJumping();
    } else {
      this.startJumping();
    }
  }

  private stopJumping() {
    this.isJumping.set(false);
    this.score.update(v => v + 1);
  }

  private startJumping() {
    this.intervalMs.update(v => Math.max(100, v * 0.95));
    this.isJumping.set(true);
    this.randomizePosition();
  }

  private randomizePosition() {
    const arena = this.arena.nativeElement;
    const rat = this.rat.nativeElement;

    const leftMax = arena.clientWidth - rat.width;
    const topMax = arena.clientHeight - rat.height;

    this.position.set({
      left: Math.random() * Math.max(0, leftMax),
      top: Math.random() * Math.max(0, topMax),
    });
  }
}
