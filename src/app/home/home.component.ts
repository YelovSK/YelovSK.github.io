import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public aaa: string = '';

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.aaa += 'A';
    }, 10);
  }
}
