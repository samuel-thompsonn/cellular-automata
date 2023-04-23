import type Board from './Board'
import type CellularAutomaton from './CellularAutomaton'
import type * as P5 from 'p5'

const MILLISECONDS_PER_SECOND = 1000
const TICKS_PER_SECOND = 100
const MINIMUM_UPDATES_PER_SECOND = 1
const MAXIMUM_UPDATES_PER_SECOND = 40
const SLIDER_GRANULARITY = 255

function initializeButton (buttonText: string, onPressed: () => void, x: number, y: number, p5: P5): P5.Element {
  const newButton = p5.createButton(buttonText)
  newButton.position(x, y)
  newButton.mousePressed(onPressed)
  return newButton
}

function initializeSlider (x: number, y: number, p5: P5): P5.Element {
  const slider = p5.createSlider(0, SLIDER_GRANULARITY, 100)
  slider.position(x, y)
  return slider
}

export default class CellularAutomatonImpl implements CellularAutomaton {
  canvasWidth: number
  canvasHeight: number
  backgroundValue: number
  board: Board
  running: boolean
  slider: P5.Element
  runInterval: NodeJS.Timer | undefined
  toggleRunButton: P5.Element
  ticksSinceLastUpdate: number

  constructor (board: Board, canvasWidth: number, canvasHeight: number, backgroundValue: number) {
    this.board = board
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.backgroundValue = backgroundValue
    this.runInterval = undefined
    this.running = false
    this.ticksSinceLastUpdate = 0
  }

  setup (p5: P5): void {
    p5.createCanvas(this.canvasWidth, this.canvasHeight)
    p5.background(this.backgroundValue)
    initializeButton('Update', () => { this.board.updateSelf() }, this.canvasWidth + 10, 30, p5)
    this.toggleRunButton = initializeButton('Run', () => { this.toggleRunning() }, this.canvasWidth + 10, 60, p5)
    this.slider = initializeSlider(this.canvasWidth + 120, 60, p5)
  }

  handleUpdateTick (): void {
    this.ticksSinceLastUpdate += 1
    const sliderProportion = ((this.slider.value() as number) / SLIDER_GRANULARITY)
    const updatesPerSecond = MINIMUM_UPDATES_PER_SECOND + (sliderProportion * (MAXIMUM_UPDATES_PER_SECOND - MINIMUM_UPDATES_PER_SECOND))
    const ticksPerUpdate = TICKS_PER_SECOND / updatesPerSecond
    if (this.ticksSinceLastUpdate >= ticksPerUpdate) {
      this.ticksSinceLastUpdate = 0
      this.board.updateSelf()
    }
  }

  toggleRunning (): void {
    if (this.running) {
      clearInterval(this.runInterval)
      this.toggleRunButton.html('Run')
    } else {
      // const sliderValue = (runSpeedSlider.value() / 255)
      // const runUpdatesPerSecond = 1 + (sliderValue * 19)
      this.runInterval = setInterval(() => { this.handleUpdateTick() }, MILLISECONDS_PER_SECOND / TICKS_PER_SECOND)
      this.toggleRunButton.html('Stop')
    }
    this.running = !this.running
  }

  draw (p5: P5): void {
    p5.background(this.backgroundValue)
    this.board.drawSelf(this.canvasWidth, this.canvasHeight, 0, 0, p5)
  }
}
