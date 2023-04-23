import * as P5 from 'p5'
import CellularAutomatonImpl from './CellularAutomatonImpl'
import BoardImpl from './BoardImpl'

const BOARD_SIZE = 10
const BOARD_WIDTH = BOARD_SIZE
const BOARD_HEIGHT = BOARD_SIZE
const CANVAS_SIZE = 400
const CANVAS_WIDTH = CANVAS_SIZE
const CANVAS_HEIGHT = CANVAS_SIZE
const BACKGROUND_VALUE = 220
const BOARD_STROKE_WEIGHT = 1
const BOARD_STROKE_VALUE = 0

const board = new BoardImpl(BOARD_WIDTH, BOARD_HEIGHT, BOARD_STROKE_WEIGHT, BOARD_STROKE_VALUE)

const cellularAutomaton = new CellularAutomatonImpl(
  board,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BACKGROUND_VALUE
)

export const sketch = (p5: P5): void => {
  p5.setup = () => {
    cellularAutomaton.setup(p5)
  }

  p5.draw = () => {
    cellularAutomaton.draw(p5)
  }
}

export const myP5 = new P5(sketch, document.body)
