// import Board from './Board'
import type CellularAutomaton from './CellularAutomaton'
import type * as P5 from 'p5'

const CANVAS_SIZE = 400
const CANVAS_WIDTH = CANVAS_SIZE
const CANVAS_HEIGHT = CANVAS_SIZE
// const BOARD_SIZE = 10
// const BOARD_WIDTH = BOARD_SIZE
// const BOARD_HEIGHT = BOARD_SIZE
const BACKGROUND_VALUE = 220

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

export default class CellularAutomatonImpl implements CellularAutomaton {
  // board: Board
  updateButton: P5.Element

  setup (p5: P5): void {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    p5.background(BACKGROUND_VALUE)
  }

  draw (p5: P5): void {
    p5.background(BACKGROUND_VALUE)
    // this.board.drawSelf(p5)
  }
}
