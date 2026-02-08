import { Injectable, signal } from '@angular/core';
import { DrawableShape } from '../components/drawing/drawing-shapes/drawable-shape.interface';

@Injectable({
    providedIn: 'root'
})
export class SceneService {
    readonly shapes = signal<DrawableShape[]>([]);

    addShape(shape: DrawableShape) {
        this.shapes.update(shapes => [...shapes, shape]);
    }

    removeShape(shape: DrawableShape) {
        this.shapes.update(shapes => shapes.filter(s => s !== shape));
    }

    clear() {
        this.shapes.set([]);
    }

    updateShape(shape: DrawableShape) {
        this.shapes.update(shapes => {
            const index = shapes.indexOf(shape);
            if (index !== -1) {
                const newShapes = [...shapes];
                newShapes[index] = shape;
                return newShapes;
            }
            return shapes;
        });
    }
}
