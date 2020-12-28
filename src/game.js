import * as PIXI from 'pixi.js';
import { Application, Container, Sprite, Texture } from 'pixi.js';

import { Item } from './item.js';
import { Message, Style } from './text.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Sofa } from './sofa.js';

export class Game extends Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });
    this.hand;
    this.smthisdoing = false;
    this.asd = false;
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
      .add('nkar', 'assets/ui/nkar.png')
      .add('red', 'assets/ui/button.png')
      .add('blue', 'assets/ui/bluebutton.png');

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
      image2: 'grayDivan',
      image3: 'burgundyDivan',
      image4: 'torquoiseDivan',
      image5: 'orangeDivan',
    };
    this.pages = [this.page2, this.page3];

    this.build();
  }

  build() {
    // this.buildTitle(this.width * 0.5, this.height * 0.125, this.width * 0.5, this.height * 0.125);
    // this.buildBg();
    this.createlastPage(this.page3);
    // this.createPage(this.page1);
  }

  createPage(page) {
    this.buildTable(page.image1, page.text1, this.width / 2, this.height * 0.4, this.width * 0.25, this.height * 0.5);
    this.buildSecondTable(
      page.image2,
      page.text2,
      this.width / 2,
      this.height * 0.75,
      this.width * 0.75,
      this.height * 0.5
    );
    this.buildHand();
  }

  pageOrintation() {
    if (this.width > this.height - 200) {
      return 'landscape';
    }
    return 'portrait';
  }

  buildTitle(portraitX, portraitY, landscapeX, landscapeY) {
    this.title = new Item(
      'logo',
      null,
      null,
      this.width,
      this.height,
      this.pageOrintation(),
      portraitX,
      portraitY,
      landscapeX,
      landscapeY
    );
    this.scaleChanging(this.title);
    this.title.image.anchor.set(0.5);
    this.stage.addChild(this.title);
  }

  buildBg() {
    const style = new Style();
    style.fontSize = 43;
    style.fill = ' 0x000000';
    const container = new Item(
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

  buildTable(nkar, text, portraitX, portraitY, landscapeX, landscapeY) {
    const style = new Style();
    style.fontSize = 43;
    style.fill = ' #000000';
    const table = new Item(
      nkar,
      text,
      style,
      this.width,
      this.height,
      this.pageOrintation(),
      portraitX,
      portraitY,
      landscapeX,
      landscapeY,
      'first'
    );
    this.tableChanging(table);
    table.text.decidePosition(0, (3 * table.image.height) / 6, 0, (3 * table.image.height) / 6);
    return table;
  }

  buildSecondTable(nkar, text, portraitX, portraitY, landscapeX, landscapeY) {
    const style = new Style();
    style.fontSize = 43;
    style.fill = '#000000';
    const table = new Item(
      nkar,
      text,
      style,
      this.width,
      this.height,
      this.pageOrintation(),
      portraitX,
      portraitY,
      landscapeX,
      landscapeY,
      'second'
    );
    this.tableChanging(table);
    table.text.decidePosition(0, (3 * table.image.height) / 5, 0, (3 * table.image.height) / 6);
    return table;
  }

  onClick(table) {
    if (!this.smthisdoing) {
      this.smthisdoing = true;
      this.hand.alpha = 0;
      const likePosition = this.likePosition(table);
      let X = likePosition.x;
      let Y = likePosition.y;
      this.buildLike(X, Y);
    }
  }

  likePosition(table) {
    // console.warn(table);
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
        // console.warn(this.smthisdoing);
        if (this.asd) {
          this.stage.removeChild(like);
          this.gotoThirdPage();
        } else {
          this.stage.removeChild(like);
          this.gotoNextPage();
        }
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
    // sprite.text.scale.set(size);
  }

  gotoNextPage() {
    this.stage.removeChildren(1, 4);
    this.smthisdoing = false;
    this.createPage(this.page2);
    this.asd = true;
  }

  gotoThirdPage() {
    this.stage.removeChildren(0, 5);
    this.createlastPage(this.page3);
    this.smthisdoing = false;
  }

  createlastPage(page) {
    this.buildTitle(this.width * 0.5, this.height * 0.125, this.width * 0.5, this.height * 0.3);
    // this.buildBg();
    this.buildRightSofas(
      page.image3,
      this.pageOrintation(),
      this.width * 0.01,
      this.height * 0.45,
      this.width * 0.5 + this.title.width,
      this.height * 0.3
    );
    this.buildLeftSofas(
      page.image2,
      this.pageOrintation(),
      this.width * 0.99,
      this.height * 0.45,
      this.width * 0.5 - this.title.width,
      this.height * 0.3
    );
    this.buildLeftSofas(
      page.image4,
      this.pageOrintation(),
      this.width * 1.08,
      this.height * 0.75,
      this.width * 0.5 - this.title.width,
      this.height * 0.6
    );
    this.buildRightSofas(
      page.image5,
      this.pageOrintation(),
      this.width * 0.001,
      this.height * 0.75,
      this.width * 0.5 + this.title.width,
      this.height * 0.6
    );
    // this.buildButton();
    // this.blueButton();
  }

  buildRightSofas(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y) {
    const sofa = new Sofa(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y);
    console.warn(sofa.height);
    this.changeScale(sofa);
    sofa.pivot.set(sofa.image.width, 0.5 * sofa.image.height);
    this.stage.addChild(sofa);
  }

  buildLeftSofas(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y) {
    const sofa = new Sofa(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y);
    console.warn(sofa.height);
    this.changeScale(sofa);
    sofa.pivot.set(sofa.image.width, 0.5 * sofa.image.height);
    this.stage.addChild(sofa);
  }

  buildButton() {
    const button = new Item(
      'red',
      null,
      null,
      this.width,
      this.height,
      this.pageOrintation(),
      this.width * 0.5,
      this.height * 0.85,
      this.width * 0.51,
      this.height * 0.5
    );
    this.scaleChanging(button);
    button.image.anchor.set(0.5);
    this.stage.addChild(button);
  }

  blueButton() {
    const button = new Item(
      'blue',
      null,
      null,
      this.width,
      this.height,
      this.pageOrintation(),
      this.width * 0.5,
      this.height * 0.95,
      this.width * 0.5,
      this.height * 0.82
    );
    // this.scaleChanging(button);
    button.image.anchor.set(0.5);
    this.stage.addChild(button);
  }

  changeScale(sprite) {
    let x;
    let y;
    if (this.pageOrintation() === 'landscape') {
      x = this.width * 0.3;
      y = this.height * 0.3;
    } else {
      x = this.width * 0.8;
      y = this.height * 0.4;
    }
    let size;
    const w = sprite.width;
    const h = sprite.height;
    console.warn(this.height / h);

    if (x / w > y / h) {
      size = y / h;
    } else {
      size = x / w;
    }

    sprite.scale.set(size);
    // sprite.text.scale.set(size);
  }
}
