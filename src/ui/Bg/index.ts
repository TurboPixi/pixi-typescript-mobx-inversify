import { Sprite, Container, Texture } from "pixi.js";
import { injectable } from "inversify";

@injectable()
export class BgUI {
  sprite: Sprite;
  constructor() {}
  draw(stage: Container) {
    const bg = new Sprite(Texture.WHITE);
    bg.tint = 0xffffff;
    stage.addChild(bg);
    this.sprite = bg;
  }
}
