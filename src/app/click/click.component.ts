import { Component, ElementRef, ViewChild } from '@angular/core';
import { ASSETS_PATHS } from '../utils';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.css']
})
export class ClickComponent {
  @ViewChild('jumpingImage') jumpingImage!: ElementRef<HTMLImageElement>;

  score = 0;
  image = ASSETS_PATHS.XDD;
  position = { top: 0, left: 0 };

  private interval: any;
  private interval_ms = 500;

  ngOnInit() {
    this.startJumping();
  }

  startJumping() {
    this.randomizePosition();

    this.interval = setInterval(() => {
      this.randomizePosition();
    }, this.interval_ms);
  }

  onImageClick() {
    if (this.image === ASSETS_PATHS.XDD) {
      clearInterval(this.interval);
      this.image = ASSETS_PATHS.DDX;
      this.score++;
    } else {
      this.startJumping();
      this.image = ASSETS_PATHS.XDD;
      this.interval_ms *= 0.9;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private randomizePosition() {
    this.position.top = Math.random() * (window.innerHeight - 100);
    this.position.left = Math.random() * (window.innerWidth - 100);
  }
}
