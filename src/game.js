import { Application, Container, Sprite, Texture } from 'pixi.js';

import { Image } from './image.js';
import { Message, Style } from './text.js';

export class Game extends Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    document.body.appendChild(this.view);
    this._loadAssets();
    this.page1 = {
      image1: 'table1k',
      text1: ' KKW\n13173',
      image2: 'table1k',
      text2: 'Worlds Away \n    Jenny S ',
    };
  }
  _loadAssets() {
    this.loader
      .add('burgundyDivan', 'assets/ui/burgundyDivan.png')
      .add('grayDivan', 'assets/ui/grayDivan.png')
      .add('orangeDivan', 'assets/ui/orangeDivan.png')
      .add('torquoiseDivan', 'assets/ui/torquoiseDivan.png')
      .add('hand', 'assets/ui/hand.png')
      .add('like', 'assets/ui/icon_like.png')
      .add('logo', 'assets/ui/logo.png')
      .add('chair1', 'assets/furniture/chair1.png')
      .add('chair2', 'assets/furniture/chair2.png')
      .add('chair3', 'assets/furniture/chair3.png')
      .add('chair4', 'assets/furniture/chair4.png')
      .add('table1', 'assets/furniture/table1.png')
      .add('table2', 'assets/furniture/table2.png')
      .add('table1k', 'assets/furniture/table1k.png')
      .add('font', 'assets/font/kenvector_future.ttf')
      .add('nkar', 'assets/ui/nkar.png');

    this.loader.load(() => {
      this._onLoadComplete();
    });
  }

  _onLoadComplete() {
    this.build();
  }

  build() {
    this.buildTitle();
    this.buildBg();
    this.createPage1(this.page1);
  }

  createPage1(page1) {
    this.buildTable(page1.image1, page1.text1);
    this.buildSecondTable(page1.image2, page1.text2);
  }

  pageOrintation() {
    if (this.width > this.height) {
      return 'landscape';
    }
    return 'portrait';
  }

  buildTitle() {
    const title = new Image(
      'logo',
      null,
      null,
      this.width,
      this.height,
      this.pageOrintation(),
      this.width * 0.5,
      this.height * 0.1,
      this.width * 0.5,
      this.height * 0.15
    );
    title.image.anchor.set(0.5);
    this.stage.addChild(title);
  }

  buildBg() {
    const style = new Style();
    style.fontSize = 43;
    style.fill = ' 0x000000';
    const container = new Image(
      'nkar',
      'Tap on the piece you love! ',
      style,
      this.width,
      this.height,
      this.pageOrintation()
    );
    const bg = container.image;
    console.warn(container.image);
    bg.width = this.width;
    bg.height = this.height / 10;
    container.decidePosition(this.width / 2, this.height * 0.2, this.width * 0.5, this.height * 0.95);

    bg.anchor.set(0.5);
    container.text.anchor.set(0.5);

    this.stage.addChild(container);
  }

  buildTable(nkar, text) {
    const style = new Style();
    style.fontSize = 43;
    style.fill = ' #000000';
    const table = new Image(
      nkar,
      text,
      style,
      this.width,
      this.height,
      this.pageOrintation(),
      this.width / 2,
      this.height * 0.4,
      this.width / 4,
      this.height * 0.5
    );
    table.image.anchor.set(0.5);
    // console.warn(table.text);
    table.text.decidePosition(0, table.image.height / 2, this.width / 2, table.image.height / 2);
    table.text.anchor.set(0.5);
    this.stage.addChild(table);
  }

  buildSecondTable(nkar, text) {
    const style = new Style();
    style.fontSize = 43;
    style.fill = '#000000';
    const table = new Image(
      nkar,
      text,
      style,
      this.width,
      this.height,
      this.pageOrintation(),
      this.width / 2,
      this.height * 0.75,
      this.width * 0.8,
      this.height * 0.5
    );
    table.image.anchor.set(0.5);
    // console.warn(table.text);
    table.text.decidePosition(0, table.image.height / 2, this.width / 2, table.image.height / 2);
    table.text.anchor.set(0.5);
    this.stage.addChild(table);
  }
}
