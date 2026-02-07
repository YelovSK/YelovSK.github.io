import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {
  private readonly http = inject(HttpClient);

  readonly word = computed(() => {
    const wordList = this.words();
    const index = this.wordIndex();

    return wordList[index];
  });

  readonly loading$ = interval(200).pipe(
    map(i => '.'.repeat((i % 3) + 1))
  );

  private readonly words = toSignal(
    this.http.get('https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt', { responseType: 'text' }).pipe(
      take(1),
      takeUntilDestroyed(),
      map(response => response.split('\n')),
      shareReplay(1),
    ),
    { initialValue: [] }
  );

  private readonly wordIndex = signal(0);

  onClick = () => this.wordIndex.set(Math.floor(Math.random() * this.words().length));
}