import type * as P5 from 'p5'
import type Neighborhood from './Neighborhood'
import type ObservableCell from './ObservableCell'

export default interface UpdatableCell extends ObservableCell {
  drawSelf: (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5) => void
  determineNextState: (neighborhood: Neighborhood<UpdatableCell>) => void
  updateToNextState: () => void
}
