import { Container, Sprite } from 'pixi.js';

export class Sofa extends Container {
  constructor(image, pageOrintation, portraitX, portraitY, landscapeX, landscapeY) {
    super();
    this._image = Sprite.from(image);
    this.pageOrintation = pageOrintation;
    this.portraitX = portraitX;
    this.portraitY = portraitY;
    this.landscapeX = landscapeX;
    this.landscapeY = landscapeY;
    this._build(image);
  }

  get image() {
    return this._image;
  }

  _build(image) {
    const leftPart = new Sprite.from(image);
    const rightPart = new Sprite.from(image);
    // console.warn(2 * leftPart.width);
    rightPart.x += 2 * leftPart.width;
    rightPart.scale.set(-1, 1);
    this.addChild(leftPart);
    this.addChild(rightPart);
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
