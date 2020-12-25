import { Text, TextStyle } from 'pixi.js';

export class Message extends Text {
  constructor(text, style, pageOrintation, portraitX, portraitY, landscapeX, landscapeY) {
    super(text, style);

    this.position.set(0, 0);
    this.anchor.set(0.5);
    this.pageOrintation = pageOrintation;
    this.portraitX = portraitX;
    this.portraitY = portraitY;
    this.landscapeX = landscapeX;
    this.landscapeY = landscapeY;
  }

  decidePosition(portraitX, portraitY, landscapeX, landscapeY) {
    if (this.pageOrintation === 'landscape') {
      this.position.set(landscapeX, landscapeY);
    } else {
      this.position.set(portraitX, portraitY);
    }
  }
}
export class Style extends TextStyle {
  constructor() {
    super();
    this.fontFamily = 'Arial';
    this.fontSize = 70;
    this.fill = ' 0xff1010';
  }
}
