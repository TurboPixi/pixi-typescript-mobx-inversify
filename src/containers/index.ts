import { Container } from "inversify";
import { TYPES } from "./types";
import { RENDERER_CONFIG } from "../constants";

import { Keyboard } from "../controls/Keyboard";
import { GameControls } from "../controls";



import { Renderer, Stage } from "../renderer";
import { App } from "../app";
import {BgUI} from "../ui/Bg";
import {UI} from "../ui";

const container = new Container();
container.bind(TYPES.Renderer).toConstantValue(new Renderer(RENDERER_CONFIG));

container.bind(TYPES.BgUI).to(BgUI);
container.bind(TYPES.UI).to(UI).inSingletonScope();

container.bind(TYPES.Stage).toConstantValue(new Stage());
container.bind(TYPES.Keyboard).to(Keyboard);
container.bind(TYPES.GameControls).to(GameControls).inSingletonScope();

container.bind(TYPES.App).to(App).inSingletonScope();

export { container };
