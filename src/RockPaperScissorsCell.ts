import type * as P5 from 'p5'
import type UpdatableCell from './UpdatableCell'
import type Color from './Color'
import type Neighborhood from './Neighborhood'

function proportionInNeighborhoodWithState (neighborhood: Neighborhood<UpdatableCell>, stateIndex: number): number {
  let numberWithState = 0
  let totalCount = 0
  neighborhood.forEach((cell) => {
    totalCount += 1
    if (cell.getState() === stateIndex) {
      numberWithState += 1
    }
  })
  return numberWithState / totalCount
}

export default class RockPaperScissorsCell implements UpdatableCell {
  stateColors: Map<number, Color>
  stateIndex: number
  nextStateIndex: number
  rpsThreshold: number

  constructor (startingStateIndex: number, stateColorsMap: Map<number, Color>, rpsThreshold: number) {
    this.stateIndex = startingStateIndex
    this.nextStateIndex = startingStateIndex
    this.stateColors = stateColorsMap
    this.rpsThreshold = rpsThreshold
  }

  getState (): number {
    return this.stateIndex
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

  determineNextState (neighborhood: Neighborhood<UpdatableCell>): void {
    const targetState = (this.stateIndex + 1) % 3
    if (proportionInNeighborhoodWithState(neighborhood, targetState) >= this.rpsThreshold) {
      this.nextStateIndex = targetState
    }
  }

  updateToNextState (): void {
    this.stateIndex = this.nextStateIndex
  }
}
