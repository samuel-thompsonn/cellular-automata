import type Board from './Board'
import type CellularAutomaton from './CellularAutomaton'
import type * as P5 from 'p5'

// const MILLISECONDS_PER_SECOND = 1000
// const MIN_RUN_UPDATES_PER_SECOND = 1
// const MAX_RUN_UPDATES_PER_SECOND = 20

// const SIMULATION_TYPES = ["Rock, Paper, Scissors"]

// var board
// var updateButton
// var runButton
// var running
// var runInterval
// var runUpdatesPerSecond
// var runSpeedSlider
// var simulationTypeMenu

// function setup() {
//     running = false
//     createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
//     board = new Board(BOARD_WIDTH, BOARD_HEIGHT)
//     updateButton = initializeButton("Update", () => board.updateSelf(), 410, 5)
//     runButton = initializeButton("Toggle running", toggleRunning, 410, 30)
//     runSpeedSlider = initializeSlider(520, 30)
//     simulationTypeMenu = initializeSelect(SIMULATION_TYPES, onChangeSimulationType, 410, 55)
//     runUpdatesPerSecond = runSpeedSlider.value()
// }

// function onChangeSimulationType(newSimulationType) {
//     console.log("Attempted to change simulation type to " + newSimulationType)
// }

// function toggleRunning() {
//     if (running === true) {
//         clearInterval(runInterval)
//     } else {
//         const sliderValue = (runSpeedSlider.value() / 255)
//         const runUpdatesPerSecond = 1 + (sliderValue * 19)
//         runInterval = setInterval(() => board.updateSelf(), MILLISECONDS_PER_SECOND / runUpdatesPerSecond)
//     }
//     running = !running
// }

// function initializeButton(buttonText, onPress, x, y) {
//     const newButton = createButton(buttonText)
//     newButton.position(x, y)
//     newButton.mousePressed(onPress)
//     return newButton
// }

// function initializeSelect(options, onSelect, x, y) {
//     const newSelect = createSelect()
//     newSelect.position(x, y)
//     options.forEach((option) => newSelect.option(option))
//     newSelect.changed(onSelect)
// }

// function initializeSlider(x, y) {
//     const slider = createSlider(0, 255, 100)
//     slider.position(x, y)
//     return slider
// }

function initializeButton (buttonText: string, onPressed: () => void, x: number, y: number, p5: P5): void {
  const newButton = p5.createButton(buttonText)
  newButton.position(x, y)
  newButton.mousePressed(onPressed)
}

export default class CellularAutomatonImpl implements CellularAutomaton {
  canvasWidth: number
  canvasHeight: number
  backgroundValue: number
  board: Board

  constructor (board: Board, canvasWidth: number, canvasHeight: number, backgroundValue: number) {
    this.board = board
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.backgroundValue = backgroundValue
  }

  setup (p5: P5): void {
    p5.createCanvas(this.canvasWidth, this.canvasHeight)
    p5.background(this.backgroundValue)
    initializeButton('Update', () => { this.board.updateSelf() }, this.canvasWidth + 10, 30, p5)
  }

  draw (p5: P5): void {
    p5.background(this.backgroundValue)
    this.board.drawSelf(this.canvasWidth, this.canvasHeight, 0, 0, p5)
  }
}
