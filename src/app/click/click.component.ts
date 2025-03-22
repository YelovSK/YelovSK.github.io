import { Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { ASSETS_PATHS } from '../utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.css'],
  standalone: true
})
export class ClickComponent {
  readonly score = signal(0);
  readonly image = signal(ASSETS_PATHS.XDD);
  readonly position = signal({ top: 0, left: 0 });
  readonly intervalMs = signal(500);
  readonly isJumping = signal(true);

  constructor() {
    interval(this.intervalMs())
      .pipe(
        takeUntilDestroyed(),
        tap(() => {
          if (this.isJumping()) {
            this.randomizePosition();
          }
        })
      )
      .subscribe();

    this.randomizePosition();
  }

  onImageClick() {
    this.isJumping() ? this.stopJumping() : this.startJumping();
  }

  private stopJumping() {
    this.isJumping.set(false);
    this.image.set(ASSETS_PATHS.DDX);
    this.score.update(val => val + 1);
  }

  private startJumping() {
    this.image.set(ASSETS_PATHS.XDD);
    this.randomizePosition();
    this.intervalMs.update(val => val * 0.9);
    this.isJumping.set(true);
  }

  private randomizePosition() {
    this.position.set({
      top: Math.random() * (window.innerHeight - 100),
      left: Math.random() * (window.innerWidth - 100)
    });
  }
}