import type * as P5 from 'p5'

export default interface Cell {
  drawSelf: (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5) => void
}
