import { loadAssets } from "./loader";
import { TYPES } from "./containers/types";
import { injectable, inject } from "inversify";
import { Renderer, Stage } from "./renderer";
import { Ticker } from "pixi.js";
import { UI } from "./ui";

@injectable()
export class App {
  private keyTicker: Ticker;
  constructor(
    @inject(TYPES.Renderer) private renderer: Renderer,
    @inject(TYPES.Stage) private stage: Stage,
    @inject(TYPES.UI) private ui: UI
  ) {
    this.keyTicker = new Ticker();
    this.keyTicker.maxFPS = 25;
    window.addEventListener("resize", this.onResize);
  }
  private onResize = () => {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    // this.stage.x = window.innerWidth / 2 - this.stage.width / 2;
    // this.stage.y = window.innerHeight / 2 - this.stage.height / 2;
  };
  private tick = () => {
    this.renderer.render(this.stage);

  };
  async load() {
    document.body.appendChild(this.renderer.view);
    // await loadAssets();
    Ticker.shared.add(this.tick);
    // this.ui.draw(this.stage);
    // this.onResize();
    // this.onMove();
    // this.onWheel();
  }
  onMove() {
    let dragFlag = false;
    let startPoint: any;
    this.renderer.plugins.interaction.on("mousedown", (event: PIXI.InteractionEvent) => {
      dragFlag = true
      startPoint = { x: event.data.global.x, y: event.data.global.y }
    })

    this.renderer.plugins.interaction.on("mousemove", (event: PIXI.InteractionEvent) => {
      if (dragFlag) {
        const dx = event.data.global.x - startPoint.x;
        const dy = event.data.global.y - startPoint.y;
        this.stage.position.x += dx;
        this.stage.position.y += dy;
        startPoint = { x: event.data.global.x, y: event.data.global.y }
      }
    })

    this.renderer.plugins.interaction.on("mouseup", (event: PIXI.InteractionEvent) => {
      dragFlag = false
    })
  }
  onWheel() {
    window.addEventListener("mousewheel", (event: any) => {
      const step = event.wheelDelta > 0 ? 0.01 : -0.01
      if (this.stage.scale.x + step >= 0.01) {
        this.stage.scale.x += step
        this.stage.scale.y += step
      }
    })
  }
}
