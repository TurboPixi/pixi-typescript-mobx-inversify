import {
  TilingSprite,
  Renderer,
  Container,
  Sprite,
  Loader,
  Graphics,
} from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH } from "../../constants";
import { Cell } from "./Cell";
import { inject, injectable } from "inversify";
import { TYPES } from "../../containers/types";

// 平铺
class Cells extends TilingSprite {
  constructor(renderer: Renderer) {
    const cell = new Cell();
    const texture = renderer.generateTexture(cell, 1, 1);
    super(texture, GRID_WIDTH, GRID_HEIGHT);
  }
}

@injectable()
export class GridUI {
  container: Container;
  constructor(
    @inject(TYPES.Renderer) private renderer: Renderer,
  ) {}
  draw(stage: Container) {
    const cells = new Cells(this.renderer);
    const container = new Container();
    this.container = container;
    container.addChild(cells);
    stage.addChild(container)
  }
  destroy() {
    this.container.destroy();
  }
}
