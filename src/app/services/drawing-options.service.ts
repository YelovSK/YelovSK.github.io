import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DrawingOptionsService {
    readonly color = signal<string>('#000000');
    readonly lineWidth = signal<number>(2);

    setColor(color: string) {
        this.color.set(color);
    }

    setLineWidth(width: number) {
        this.lineWidth.set(width);
    }
}
