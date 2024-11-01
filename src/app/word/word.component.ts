import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent {
  private readonly URL = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt';
  private words: string[] = [];

  word: string = '';

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    const response = await firstValueFrom(this.httpClient.get(this.URL, { responseType: 'text' }));
    this.words = response.split('\n');
    this.word = this.getRandomWord();
  }

  onClick() {
    this.word = this.getRandomWord();
  }

  private getRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
}