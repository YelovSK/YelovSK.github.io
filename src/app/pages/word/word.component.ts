import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class WordComponent {
  private readonly httpService = inject(HttpService);

  readonly word = computed(() => {
    const wordList = this.words();
    const index = this.wordIndex();

    return wordList[index];
  });

  readonly loading$ = interval(500).pipe(
    map(i => '.'.repeat((i % 3) + 1))
  );

  private readonly words = toSignal(
    this.httpService.getWords().pipe(takeUntilDestroyed()),
    { initialValue: [] }
  );

  private readonly wordIndex = signal(0);

  onClick = () => this.wordIndex.set(Math.floor(Math.random() * this.words().length));
}