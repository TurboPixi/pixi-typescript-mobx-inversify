import { Container, Renderer as PixiRenderer, Graphics,Point } from "pixi.js";
import { injectable } from "inversify";

@injectable()
export class Renderer extends PixiRenderer {}

@injectable()
export class Stage extends Container {
    constructor() {
        super();
        const g = new Graphics()
        g.lineStyle(1, 0x000000)
        const L = 50
        // 圆心
        const o = new Point(window.innerWidth/2, window.innerHeight/2)
        const xMax = new Point(o.x * 2, o.y);
        const xMin = new Point(0, o.y);
        const yMin = new Point(o.x, 0);
        const yMax = new Point(o.x, o.y * 2);
        g.moveTo(o.x, o.y)
        g.drawCircle(o.x, o.y, 10)
        // x+
        g.lineTo(xMax.x, xMax.y);
        g.moveTo(o.x, o.y)
        // x-
        g.lineTo(xMin.x, xMin.y);
        g.moveTo(o.x, o.y)
        // y-
        g.lineTo(yMax.x, yMax.y);
        g.moveTo(o.x, o.y)
        // y+
        g.lineTo(yMin.x, yMin.y)
        g.moveTo(o.x, o.y)
        for (let i=0;i< Math.floor(o.x); i ++) {
            if (i===0) continue;
            const x1 = o.x - i * L;
            const x2 = o.x + i * L;
            const y = o.y;
            g.moveTo(x1, y);
            g.lineTo(x1, 0)
            g.moveTo(x1, y);
            g.lineTo(x1, y * 2)
            g.moveTo(x2, y);
            g.lineTo(x2, 0)
            g.moveTo(x2, y);
            g.lineTo(x2, y * 2)
        }
        for (let i=0;i< Math.floor(o.y); i ++) {
            if (i===0) continue;
            const y1 = o.y - i * L;
            const y2 = o.y + i * L;
            const x = o.x;
            g.moveTo(x, y1);
            g.lineTo(x * 2, y1)
            g.moveTo(x, y1);
            g.lineTo(0, y1)

            g.moveTo(x, y1);
            g.lineTo(x * 2, y1)
            g.moveTo(x, y1);
            g.lineTo(0, y1)

            g.moveTo(x, y2);
            g.lineTo(x * 2, y2)
            g.moveTo(x, y2);
            g.lineTo(0, y2)

        }


        g.endFill();
        this.addChild(g)
    }
}
