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
    gsap.killTweensOf(this.hand);
    gsap.killTweensOf(this._fgh);
    this.asd = false;
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
    this.build();
  }

  build() {
    this.buildTitle(this.width * 0.5, this.height * 0.125, this.width * 0.5, this.height * 0.125);
    this.buildBg('Tap on the piece you love!');
    // this.createlastPage(this.page3);
    this.createPage(this.page1);
  }

  createPage(page) {
    this.buildTable(page.image1, page.text1, this.width / 2, this.height * 0.4, this.width * 0.25, this.height * 0.5);
    this.buildSecondTable(
      page.image2,
      page.text2,
      this.width / 2,
      this.height * 0.77,
      this.width * 0.75,
      this.height * 0.5
    );
    this.buildHand();
  }

  pageOrintation() {
    if (this.width > this.height) {
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
    this.changeScale(this.title, 0.3, 0.31, 0.7, 0.4);
    this.title.image.anchor.set(0.5);
    this.stage.addChild(this.title);
  }

  buildBg(text) {
    console.warn('aa');
    const container = new Container();
    console.warn(container);
    const style = new Style();
    style.fontSize = 43;
    style.fill = ' #ffffff';
    const string = new Message(text, style);
    string.anchor.set(0.5, -0.5);
    string.x = this.width / 2;
    // container.pivot.set(this.width * 0.5, this.height * 0.1 * 0.5);
    if (this.pageOrintation() === 'landscape') {
      container.position.set(0, this.height * 0.97);
    } else {
      container.position.set(0, this.height * 0.2);
    }
    const gr = new PIXI.Graphics();
    gr.beginFill(0x537f7e);
    gr.drawRect(0, 0, this.width, this.height * 0.1);
    gr.endFill();
    container.addChild(gr);
    container.addChild(string);
    this.stage.addChild(container);
  }

  tableChanging(table) {
    this.changeScale(table, 0.5, 0.6, 0.7, 0.5);
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
    like.anchor.set(0.5);
    like.position.set(X, Y);
    this.likeAnimation(like);
    this.stage.addChild(like);
  }

  likeAnimation(like) {
    const scale = this.changeScale(like, 0.2, 0.2, 0.3, 0.3);
    const tl = gsap.timeline({ repeatDelay: 1 });
    tl.to(like, { pixi: { scaleX: 0.5 * scale, scaleY: 0.5 * scale }, duration: 0.5 });
    tl.to(like, {
      pixi: { scaleX: scale, scaleY: scale },
      duration: 0.5,
      onComplete: () => {
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
    const scale = this.changeScale(hand, 0.1, 0.2, 0.2, 0.3);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(hand, { x: fromX, y: fromY, ease: Bounce, duration: 1, yoyo: true });
    tl.to(hand, { pixi: { scaleX: scale * 0.5, scaleY: scale * 0.5 }, duration: 1 });
    tl.to(hand, { pixi: { scaleX: scale, scaleY: scale }, duration: 1 });
    tl.to(hand, { x: toX, y: toY, ease: Bounce, duration: 1 });
    tl.to(hand, { pixi: { scaleX: scale * 0.5, scaleY: scale * 0.5 }, duration: 1 });
    tl.to(hand, { pixi: { scaleX: scale, scaleY: scale }, duration: 1 });
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
    this.buildBg('Keep exploring the catalog!');
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
      this.width * 1,
      this.height * 0.7,
      this.width * 0.5 - this.title.width,
      this.height * 0.69
    );
    this.buildRightSofas(
      page.image5,
      this.pageOrintation(),
      this.width * 0.01,
      this.height * 0.7,
      this.width * 0.5 + this.title.width,
      this.height * 0.69
    );
    this.buildButton();
    this.blueButton();
  }

  buildRightSofas(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y) {
    const sofa = new Sofa(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y);
    this.changeScale(sofa, 0.3, 0.31, 0.7, 0.4);
    sofa.pivot.set(sofa.image.width, 0.5 * sofa.image.height);
    this.stage.addChild(sofa);
  }

  buildLeftSofas(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y) {
    const sofa = new Sofa(nkar, pageOrintation, portraitX, portraitY, landscapeX, landscapeY, x, y);
    this.changeScale(sofa, 0.3, 0.31, 0.7, 0.4);
    sofa.pivot.set(sofa.image.width, 0.5 * sofa.image.height);
    this.stage.addChild(sofa);
  }

  buildButton() {
    const button = new Sprite.from('red');
    if (this.pageOrintation() === 'landscape') {
      button.position.set(this.width * 0.5, this.height * 0.59);
    } else {
      button.position.set(this.width * 0.5, this.height * 0.87);
    }
    button.anchor.set(0.5);
    this.buttonAnimation(button);
    this.stage.addChild((this._fgh = button));
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
      this.height * 0.75
    );
    button.image.interactive = true;
    button.image.on('pointerdown', () => {
      this._rebuildStage();
    });
    button.image.anchor.set(0.5);
    this.stage.addChild(button);
    this.changeScale(button, 0.2, 0.1, 0.15, 0.2);
  }

  changeScale(sprite, lanW, lanH, porX, porY) {
    let x;
    let y;
    if (this.pageOrintation() === 'landscape') {
      x = this.width * lanW;
      y = this.height * lanH;
    } else {
      x = this.width * porX;
      y = this.height * porY;
    }
    let size;
    const w = sprite.width;
    const h = sprite.height;

    if (x / w > y / h) {
      size = y / h;
    } else {
      size = x / w;
    }
    if (size >= 1) {
      size = 1;
    }
    sprite.scale.set(size);
    console.warn(size);
    return size;
  }

  buttonAnimation(button) {
    const tl = gsap.timeline({ repeat: -1 });
    const scale = this.changeScale(button, 0.3, 0.15, 0.5, 0.2);
    console.warn(scale);
    tl.to(button, { pixi: { scaleX: scale * 0.92, scaleY: scale * 0.92 }, duration: 0.8 });
    tl.to(button, { pixi: { scaleX: scale, scaleY: scale }, duration: 0.8 });
  }
}
