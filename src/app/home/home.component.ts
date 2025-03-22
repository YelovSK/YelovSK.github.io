import { Component, signal, computed, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, timer, tap, map, delay, delayWhen } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {
  readonly letterCount = signal(0);
  readonly aaa = computed(() => 'A'.repeat(this.letterCount()));
  readonly intervalSubject = new BehaviorSubject<number>(500);

  constructor() {
    this.intervalSubject.pipe(
      switchMap(interval =>
        timer(0, interval).pipe(
          tap(() => this.letterCount.update(count => count + 1)),
          map(() => Math.max(1, this.intervalSubject.value * 0.96)),
          delayWhen(newInterval => timer(newInterval)),
          tap(newInterval => this.intervalSubject.next(newInterval))
        )
      ),
      takeUntilDestroyed()
    ).subscribe();
  }
}