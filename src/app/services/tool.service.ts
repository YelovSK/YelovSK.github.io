import { Injectable, signal } from '@angular/core';
import { DrawingTool } from '../components/drawing/drawing-tools/drawing-tool.interface';

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    private tools = new Map<string, DrawingTool>();
    readonly activeTool = signal<DrawingTool | null>(null);
    readonly activeToolName = signal<string | null>(null);

    registerTool(name: string, tool: DrawingTool) {
        this.tools.set(name, tool);
    }

    selectTool(name: string) {
        const tool = this.tools.get(name);
        if (tool) {
            this.activeToolName.set(name);
            this.activeTool.set(tool);
        }
    }

    getTool(name: string): DrawingTool | undefined {
        return this.tools.get(name);
    }
}
