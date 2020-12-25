import { Container, Sprite, Texture } from 'pixi.js';
import { Message, Style } from './text.js';

export class Image extends Container {
  constructor(image, text, style, pageW, pageH, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, dif) {
    super();
    this._image = new Sprite.from(image);
    this.style = style;
    this._text = new Message(text, this.style);
    this.pageW = pageW;
    this.pageH = pageH;
    this.pageOrintation = pageOrintation;
    this.portraitX = portraitX;
    this.portraitY = portraitY;
    this.landscapeX = landscapeX;
    this.landscapeY = landscapeY;
    this.dif = dif;
    this.build();
    this.addChild(this._image);
    this.addChild(this._text);
  }

  get image() {
    return this._image;
  }

  get text() {
    return this._text;
  }

  build() {
    this.buildImage();
  }

  buildImage() {
    this.decidePosition(this.portraitX, this.portraitY, this.landscapeX, this.landscapeY);
  }

  decidePosition(portraitX, portraitY, landscapeX, landscapeY) {
    if (this.pageOrintation === 'landscape') {
      this.position.set(landscapeX, landscapeY);
    } else {
      this.position.set(portraitX, portraitY);
    }
  }
}
