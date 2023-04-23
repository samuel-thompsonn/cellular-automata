import type * as P5 from 'p5'
import type Board from './Board'

export default class BoardImpl implements Board {
  width: number
  height: number
  strokeWeight: number
  strokeValue: number

  constructor (width: number, height: number, strokeWeight: number, strokeValue: number) {
    this.width = width
    this.height = height
    this.strokeWeight = strokeWeight
    this.strokeValue = strokeValue
  }

  drawSelf (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    this.drawCellFrames(pixelWidth, pixelHeight, x, y, p5)
  }

  drawCellFrames (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    p5.stroke(this.strokeValue)
    p5.strokeWeight(this.strokeWeight)
    const effectivePixelDimensions = {
      width: pixelWidth - 1,
      height: pixelHeight - 1
    }
    for (let i = 0; i <= this.height; i++) {
      const lineY = y + (i * (effectivePixelDimensions.height / this.height))
      p5.line(x, lineY, x + effectivePixelDimensions.width, lineY)
    }
    for (let j = 0; j <= this.width; j++) {
      const lineX = x + (j * (effectivePixelDimensions.width / this.width))
      p5.line(lineX, y, lineX, y + effectivePixelDimensions.height)
    }
  }

  updateSelf (): void {

  }
}
