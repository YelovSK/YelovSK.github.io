import { Injectable, NgZone } from "@angular/core";
import { interval } from "rxjs";

interface LoopTask {
    fn: () => void;
    interval: number;
    /**
     * Tasks with lower execution order will be executed first.
     */
    executionOrder: number;
    lastExecutionTime: number;
}

@Injectable({ providedIn: 'root' })
export class LoopService {
    private tasks: LoopTask[] = [];

    constructor(private ngZone: NgZone) {
        this.ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => this.loop());
        });
    }

    add(fn: () => void, interval: number, executionOrder: number): void {
        const task: LoopTask = { fn: fn, interval: interval, executionOrder: executionOrder, lastExecutionTime: 0 };
        this.tasks = [...this.tasks, task].sort((a, b) => a.executionOrder - b.executionOrder);
    }

    private loop() {
        const now = performance.now();

        for (const task of this.tasks) {
            const delta = now - task.lastExecutionTime;

            if (delta >= task.interval) {
                task.fn();
                // Adjust for drift by syncing to the expected time, but catch up if too far behind
                task.lastExecutionTime = now - (delta % task.interval);
            }
        }

        requestAnimationFrame(() => this.loop());
    };
}