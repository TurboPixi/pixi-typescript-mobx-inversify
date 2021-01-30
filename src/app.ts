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
    this.stage.x = window.innerWidth / 2 - this.stage.width / 2;
    this.stage.y = window.innerHeight / 2 - this.stage.height / 2;
  };
  private tick = () => {
    this.renderer.render(this.stage);
  };
  async load() {
    document.body.appendChild(this.renderer.view);
    await loadAssets();
    // Ticker.shared.add(this.tick);
    this.ui.draw(this.stage);
    setTimeout(this.tick, 100)
    this.onResize();
  }
}
