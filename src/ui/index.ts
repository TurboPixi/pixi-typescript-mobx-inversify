import { Container } from "pixi.js";
import { BgUI } from "./Bg";
import { injectable, inject } from "inversify";
import { TYPES } from "../containers/types";

@injectable()
export class UI {
  private container: Container;
  constructor(
    @inject(TYPES.BgUI) private bg: BgUI,
  ) {
    this.container = new Container();
  }
  draw(stage: Container) {
    this.bg.draw(stage);
  }
}
