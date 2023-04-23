import * as P5 from 'p5'
import type Cell from './Cell'
import type Color from './Color'
import BoardImpl from './BoardImpl'
import CellularAutomatonImpl from './CellularAutomatonImpl'
import RockPaperScissorsCell from './RockPaperScissorsCell'

const BOARD_SIZE = 60
const BOARD_WIDTH = BOARD_SIZE
const BOARD_HEIGHT = BOARD_SIZE
const CANVAS_SIZE = 400
const CANVAS_WIDTH = CANVAS_SIZE
const CANVAS_HEIGHT = CANVAS_SIZE
const BACKGROUND_VALUE = 220
const BOARD_STROKE_WEIGHT = 1
const BOARD_STROKE_VALUE = 0
const STATES_LIST = [0, 1, 2]
const STATE_COLORS = stateColorsMap()
const RPS_THRESHOLD = 3 / 8

function stateColorsMap (): Map<number, Color> {
  const stateColorsMap = new Map()
  stateColorsMap.set(0, { red: 200, green: 0, blue: 0 })
  stateColorsMap.set(1, { red: 0, green: 200, blue: 0 })
  stateColorsMap.set(2, { red: 0, green: 0, blue: 200 })
  return stateColorsMap
}

function randomSampleFromList (list: any[]): any {
  return Math.floor(Math.random() * list.length)
}

function createCells (width: number, height: number, statesList: any[]): Cell[][] {
  const cells = []
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      row.push(new RockPaperScissorsCell(randomSampleFromList(statesList), STATE_COLORS, RPS_THRESHOLD))
    }
    cells.push(row)
  }
  return cells
}

const board = new BoardImpl(BOARD_WIDTH, BOARD_HEIGHT, BOARD_STROKE_WEIGHT, BOARD_STROKE_VALUE, createCells(BOARD_WIDTH, BOARD_HEIGHT, STATES_LIST))

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
