import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public aaa: string = '';
  private interval: number = 500;

  constructor() { }

  ngOnInit(): void {
    this.startAccelerating();
  }

  startAccelerating() {
    const accelerate = () => {
      this.aaa += 'A';

      if (this.interval > 1) {
        this.interval *= 0.96;
      }

      setTimeout(accelerate, this.interval);
    };

    accelerate();
  }
}