import type * as P5 from 'p5'
import type Cell from './Cell'
import type Color from './Color'

export default class RockPaperScissorsCell implements Cell {
  stateColors: Map<number, Color>
  stateIndex: number

  constructor (startingStateIndex: number, stateColorsMap: Map<number, Color>) {
    this.stateIndex = startingStateIndex
    this.stateColors = stateColorsMap
  }

  drawSelf (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    const stateColor = this.stateColors.get(this.stateIndex)
    if (stateColor === undefined) {
      throw new Error(`RockPaperScissors cell has invalid state ${this.stateIndex}`)
    }
    p5.noStroke()
    p5.fill(p5.color(stateColor.red, stateColor.green, stateColor.blue))
    p5.rect(x, y, pixelWidth, pixelHeight)
  }
}
