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
      image1: 'table1',
      text1: '  KKW\n13173',
      image2: 'table2',
      text2: 'Worlds Away \n    Jenny S ',
    };
    this.page2={
      image1: 'chair4',
      text1: '      DWR\nReid Ottoman',
      image2: 'chair3',
      text2: '       DWR \n Womb Ottoman ',
    }
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
    // this.buildBg();
    this.createPage(this.page1);
  }

  createPage(page) {
    this.buildTable(page.image1, page.text1);
    this.buildSecondTable(page.image2, page.text2);
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
      this.height * 0.125,
      this.width * 0.5,
      this.height * 0.125
    );
    this.scaleChanging(title)
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
      this.pageOrintation(),
      null,
      null,
      null,
      null,
    );
    const bg = container.image;
    // console.warn(container.image);
    bg.width = this.width;
    bg.height = this.height / 10;
    container.decidePosition(this.width / 2, this.height *0.2, this.width * 0.5, this.height * 0.95);
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
      this.width*0.25,
      this.height * 0.5
    );
    console.warn(table.height,this.width*0.5);
    console.warn(table.image.height,this.height * 0.5);
    this.scaleChanging(table)
    table.image.anchor.set(0.5);
    // console.warn(table.text);
    table.text.decidePosition(0, 3*table.image.height /6, 0, 3*table.image.height/6);
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
      this.width *0.75,
      this.height * 0.5
      );
      this.scaleChanging(table)
    table.image.anchor.set(0.5);
    // console.warn(table.text);
    table.text.decidePosition(0, 3*table.image.height / 5, 0, 3*table.image.height /6);
    table.text.anchor.set(0.5);
    this.stage.addChild(table);

  }

  scaleChanging(sprite) {
    let x=sprite.width
    let y=sprite.height
    
    let size;
    const w = sprite.image.width;
    const h = sprite.image.height;
     console.warn(w,x,h,y);
    if (x / w > y / h) {
      size = y / h;
    } else {
      size = x / w;
    }
    sprite.scale.set(size);
}
}
