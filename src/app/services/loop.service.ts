import { Injectable } from "@angular/core";
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

    constructor() {
        interval(1).subscribe(() => this.loop());
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
                task.lastExecutionTime = now;
            }
        }
    };
}