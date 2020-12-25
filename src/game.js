import * as PIXI from 'pixi.js';
import { Application, Container, Sprite, Texture } from 'pixi.js';

import { Image } from './image.js';
import { Message, Style } from './text.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

export class Game extends Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });
    this.hand;
    this.smthisdoing = false;
    document.body.appendChild(this.view);
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    this._loadAssets();
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
    this._rebuildStage();
  }

  _rebuildStage() {
    this.stage.destroy({ children: true });
    this.stage = new Container();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.page1 = {
      image1: 'table1',
      text1: '  KKW\n13173',
      image2: 'table2',
      text2: 'Worlds Away \n    Jenny S ',
    };
    this.page2 = {
      image1: 'chair4',
      text1: '      DWR\nReid Ottoman',
      image2: 'chair3',
      text2: '       DWR \n Womb Ottoman ',
    };
    this.page3 = {
      image1: 'logo',
      image2: 'burgundyDivan',
      image2: 'grayDivan',
      image2: 'orangeDivan',
      image2: 'torquoiseDivan',
    };

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
    this.buildHand();
  }

  pageOrintation() {
    if (this.width > this.height - 200) {
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
    this.scaleChanging(title);
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
      null
    );
    const bg = container.image;
    // console.warn(container.image);
    bg.width = this.width;
    bg.height = this.height / 13;
    this.scaleChanging(container);
    container.decidePosition(this.width / 2, this.height * 0.25, this.width * 0.5, this.height * 0.99);
    bg.anchor.set(0.5);
    container.text.anchor.set(0.5);
    this.stage.addChild(container);
  }

  tableChanging(table) {
    this.scaleChanging(table);
    table.image.anchor.set(0.5);
    table.text.anchor.set(0.5);
    table.interactive = true;
    table.on('pointerdown', this.onClick.bind(this, table));
    this.stage.addChild(table);
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
      this.width * 0.25,
      this.height * 0.5,
      'first'
    );
    this.tableChanging(table);
    table.text.decidePosition(0, (3 * table.image.height) / 6, 0, (3 * table.image.height) / 6);
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
      this.width * 0.75,
      this.height * 0.5,
      'second'
    );
    this.tableChanging(table);
    table.text.decidePosition(0, (3 * table.image.height) / 5, 0, (3 * table.image.height) / 6);
  }

  onClick(table) {
    if (!this.smthisdoing) {
      this.smthisdoing = true;
      this.hand.alpha = 0;
      console.warn('aaaaaaaaaaaaaaaaaaaaaaaaaa');
      const likePosition = this.likePosition(table);
      let X = likePosition.x;
      let Y = likePosition.y;
      this.buildLike(X, Y);
    }
  }

  likePosition(table) {
    console.warn(table);
    let X, Y;
    if (this.pageOrintation() === 'landscape') {
      if (table.dif === 'first') {
        X = this.width * 0.25;
        Y = this.height * 0.5;
      } else {
        X = this.width * 0.75;
        Y = this.height * 0.5;
      }
    } else {
      if (table.dif === 'first') {
        X = this.width / 2;
        Y = this.height * 0.4;
      } else {
        X = this.width / 2;
        Y = this.height * 0.75;
      }
    }
    return { x: X, y: Y };
  }

  buildLike(X, Y) {
    const like = new Sprite.from('like');
    this.stage.addChild(like);
    like.anchor.set(0.5);
    like.position.set(X, Y);
    const tl = gsap.timeline({ repeatDelay: 1 });
    tl.to(like, { pixi: { scaleX: 0.5, scaleY: 0.5 }, duration: 0.5 });
    tl.to(like, {
      pixi: { scaleX: 1, scaleY: 1 },
      duration: 0.5,
      onComplete: () => {
        this.gotoNextPage();
        this.stage.removeChild(like);
        console.warn('nnnnnnnnnnnnnnnnnnnn');
      },
    });
  }

  buildHand() {
    const hand = new Sprite.from('hand');
    if (this.pageOrintation() === 'landscape') {
      hand.position.set(this.width * 0.25, this.height);
    } else {
      hand.position.set(this.width / 2, this.height);
    }
    this.stage.addChild((this.hand = hand));
    this.handAnimation(hand);
  }

  handAnimation(hand) {
    let fromX, toX;
    let fromY, toY;
    if (this.pageOrintation() === 'landscape') {
      fromX = this.width * 0.25;
      fromY = this.height * 0.5;
      toX = this.width * 0.75;
      toY = this.height * 0.5;
    } else {
      fromX = this.width / 2;
      fromY = this.height * 0.4;
      toX = this.width / 2;
      toY = this.height * 0.75;
    }
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(hand, { x: fromX, y: fromY, ease: Bounce, duration: 1, yoyo: true });
    tl.to(hand, { pixi: { scaleX: 0.5, scaleY: 0.5 }, duration: 1 });
    tl.to(hand, { pixi: { scaleX: 1, scaleY: 1 }, duration: 1 });
    tl.to(hand, { x: toX, y: toY, ease: Bounce, duration: 1 });
    tl.to(hand, { pixi: { scaleX: 0.5, scaleY: 0.5 }, duration: 1 });
    tl.to(hand, { pixi: { scaleX: 1, scaleY: 1 }, duration: 1 });
  }

  scaleChanging(sprite) {
    let x;
    let y;
    if (this.pageOrintation() === 'landscape') {
      x = this.width * 0.4;
      y = this.height * 0.8;
    } else {
      x = this.width * 0.8;
      y = this.height * 0.4;
    }
    let size;
    const w = sprite.image.width;
    const h = sprite.image.height;
    if (x / w > y / h) {
      size = y / h;
    } else {
      size = x / w;
    }

    sprite.image.scale.set(size);
    sprite.text.scale.set(size);
  }

  gotoSecondPage() {
    this.gotoNextPage();
    this.stage.removeChild(like);
  }

  gotoThirdPage() {
    this.stage.removeChildren(0, 3);
    this.createPage(this.page2);
    this.smthisdoing = false;
    this.stage.removeChild(like);
  }

  gotoNextPage() {
    this.stage.removeChildren(1, 3);
    this.createPage(this.page2);
    this.smthisdoing = false;
  }
}
