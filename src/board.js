import { Container, CountLimiter, Sprite, Text, TextStyle, Texture } from 'pixi.js'
import sampleSize from 'lodash.samplesize'
import sample from 'lodash.sample'
import { BAllS } from './constants';
import { Cell } from './cell.js'
import { Ball } from './ball';
import chunk from 'lodash.chunk'
import { Bar } from './bar.js'
import { Message, Style } from './text.js'
import { getEmiter } from './game';

class ScoreBoxComponent extends Container {
    constructor() {
        super()

        this._build()
    }

    updateScore(value) {
        this.text.text = "Score : " + value
    }

    _build() {
        this.addChild((this._bg = this._buildBg()))
        this.addChild((this.text = this._buildText()))
    }

    _buildBg() {
        const bg = new Sprite(Texture.from('button1'))
        bg.anchor.set(0.5)
        return bg
    }

    _buildText() {
        const style = new Style()
        style.fontSize = 36;
        style.fill = ' 0xff1010';
        const text = new Message("Score : " + 0, style)

        return text
    }
}


export class Board extends Container {

    constructor(config) {
        super();

        this.config = config
        this.cells = []
        this.balls = []
        this.score = 0;

        this._createCells()
        this._createScoreBox()
        this._createBalls(this.config.entry)


        this._scorBox.updateScore(this.score)
    }

    _createCells() {
        const { size } = this.config
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const cell = new Cell()
                cell.interactive = true
                cell.on('pointerdown', this._onCellClick.bind(this, cell))
                cell.x = row * cell.width
                cell.y = col * cell.height
                cell.row = row
                cell.col = col
                this.cells.push(cell)
                this.addChild(cell)


            }
        }

        this.cells2D = chunk(this.cells, size)
    }

    _createScoreBox() {
        this._scorBox = new ScoreBoxComponent()
        this._scorBox.y = this.height
        this.addChild(this._scorBox)
    }


    _createBalls(count) {
        const emptyCells = sampleSize(this.cells.filter((cell) => !cell.ball), count)
        emptyCells.forEach(cell => {
            const frame = sample(BAllS)
            const ball = new Ball(frame)
            cell.setBall(ball)
        })

        this._checkForMatch()
        this._checkForGameOver()


    }

    _onCellClick(cell) {
        let startI;
        let startJ;
        let finishI;
        let finishJ;

        if (cell !== this._activeCell) {
            if (this._activeCell) {
                this._activeCell.deactivate()
            }
            if (cell.ball) {
                this._activeCell = cell.activate()
            } else if (cell.isEmpty() && this._activeCell) {
                startI = this._activeCell.row
                startJ = this._activeCell.col
                finishI = cell.row
                finishJ = cell.col
                this._activeCell.deactivate()
                this._activeCell = null
                this._movment(startI, startJ, finishI, finishJ, cell);
            }
        } else {
            this._activeCell.deactivate()
            this._activeCell = null

        }

    }

    _checkForMatch(cell) {
        const { size } = this.config
        let arr = []
        let ballFrame = ''
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = this.cells2D[i][j]
                if (cell && cell.ball && cell.ball.frame === ballFrame) {
                    arr.push(cell)
                } else {
                    if (arr.length <= 4) {
                        arr = []
                    } else {
                        arr.forEach(element => {
                            element.remove()
                            this.score += 1

                        })

                        arr = []
                    }
                    if (cell && cell.ball && cell.ball.frame) {
                        ballFrame = cell.ball.frame
                        arr.push(cell)
                    }
                }
            }
            if (arr.length <= 4) {
                arr = []
            } else {
                arr.forEach(element => {
                    element.remove()
                    this.score += 1


                })
                arr = []
            }
        }

        let arr1 = []
        let ballFrame1 = ''
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                const cell1 = this.cells2D[i][j]
                if (cell1 && cell1.ball && cell1.ball.frame === ballFrame1) {
                    arr1.push(cell1)
                } else {
                    if (arr1.length <= 4) {
                        arr1 = []
                    } else {
                        arr1.forEach(element => {
                            element.remove()
                            this.score += 1

                        })


                        arr1 = []
                    }
                    if (cell1 && cell1.ball && cell1.ball.frame) {

                        ballFrame1 = cell1.ball.frame
                        arr1.push(cell1)
                    }
                }
            }
            if (arr1.length <= 4) {
                arr1 = []
            } else {
                arr1.forEach(element => {
                    element.remove()
                    this.score += 1


                })

                arr1 = []
            }
        }

        this._scorBox.updateScore(this.score)
    }

    _movment(i1, j1, i2, j2, cell) {
        var PF = require('pathfinding');
        const { size } = this.config

        const matrix = []
        for (let i = 0; i < size; i++) {
            matrix[i] = []
            for (let j = 0; j < size; j++) {
                if (this.cells2D[j][i].ball) {
                    matrix[i][j] = 1
                } else {
                    matrix[i][j] = 0
                }

            }
        }
        var grid = new PF.Grid(matrix);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(i1, j1, i2, j2, grid);

        if (path.length > 0) {
            let i = 0
            const selectedCell = this.cells2D[i1][j1]
            const ball = selectedCell.ball
            selectedCell.ball = null

            const interval = setInterval(() => {
                const cell = this.cells2D[path[i][0]][path[i][1]]
                cell.addChild(ball)
                i++
                if (i >= path.length) {
                    cell.ball = ball
                    clearInterval(interval)
                    this._createBalls(this.config.spawn)
                }
            }, 100)

        }
        if (path.length === 0) {
        }


    }

    _checkForGameOver() {
        const container = new Container()
        let count = 0;
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].ball) {
                count++
                if (count === this.cells.length) {
                    const bar = new Bar()
                    const style = new Style()
                    const text = new Message('Game Over.', style);

                    const style3 = new Style()
                    style3.fontSize = 36;
                    style3.fill = ' 0xff1010';
                    const text3 = new Message("Score : " + this.score, style3)
                    text3.position.x = 200
                    text3.position.y = 280

                    const style4 = new Style()
                    style4.fontSize = 20;
                    style4.fill = ' 0xff1010';
                    const text4 = new Message('Play again', style4)
                    text4.interactive = true
                    text4.position.x = 220
                    text4.position.y = 320
                    text4.on('pointerdown', () => {
                        const emitter = getEmiter()

                        emitter.emit("game_over")
                    });

                    container.addChild(bar)
                    container.addChild(text)
                    container.addChild(text3)
                    container.addChild(text4)


                }
            }
        }
        this.addChild(container)

    }


}
