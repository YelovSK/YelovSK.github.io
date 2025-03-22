import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.css'],
    standalone: false
})
export class WordComponent {
  private readonly URL = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt';
  private readonly httpClient = inject(HttpClient);

  readonly word = computed(() => {
    const wordList = this.words();
    const index = this.wordIndex();

    return wordList[index];
  });

  private readonly words = toSignal(
    this.httpClient.get(this.URL, { responseType: 'text' }).pipe(
      takeUntilDestroyed(),
      map(response => response.split('\n'))
    ),
    { initialValue: [] }
  );

  private readonly wordIndex = signal(0);

  onClick = () => this.wordIndex.set(Math.floor(Math.random() * this.words().length));
}