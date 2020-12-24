import { Container, Sprite, Texture } from 'pixi.js';
import { Message, Style } from './text.js';

export class Image extends Container {
  constructor(image, text, style, pageW, pageH, pageOrintation, portraitX, portraitY, landscapeX, landscapeY) {
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
    this.scaleChanging();
  }

  decidePosition(portraitX, portraitY, landscapeX, landscapeY) {
    if (this.pageOrintation === 'landscape') {
      this.position.set(landscapeX, landscapeY);
      return { x: landscapeX, y: landscapeX };
    } else {
      this.position.set(portraitX, portraitY);
      return { x: portraitX, y: portraitY };
    }
  }

  scaleChanging() {
    let x;
    let y;
    if (this.pageOrintation === 'landscape') {
      x = this.pageW * 0.4;
      y = this.pageH * 0.8;
    } else {
      x = this.pageW * 0.8;
      y = this.pageH * 0.4;
    }
    let size;
    const w = this._image.width;
    const h = this._image.height;
    console.warn(w);
    if (x / w > y / h) {
      size = y / h;
    } else {
      size = x / w;
    }

    this.scale.set(size);
  }
}
