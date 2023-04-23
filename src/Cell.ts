import type * as P5 from 'p5'
import type Neighborhood from './Neighborhood'

export default interface Cell {
  getState: () => number
  drawSelf: (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5) => void
  determineNextState: (neighborhood: Neighborhood) => void
  updateToNextState: () => void
}
