import type * as P5 from 'p5'
import type Board from './Board'
import type Cell from './Cell'

export default class BoardImpl implements Board {
  width: number
  height: number
  strokeWeight: number
  strokeValue: number
  cells: Cell[][]

  constructor (width: number, height: number, strokeWeight: number, strokeValue: number, cells: Cell[][]) {
    this.width = width
    this.height = height
    this.strokeWeight = strokeWeight
    this.strokeValue = strokeValue
    this.cells = cells
  }

  drawSelf (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    this.drawCellFrames(pixelWidth, pixelHeight, x, y, p5)
    this.drawCells(pixelWidth, pixelHeight, x, y, p5)
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

  drawCells (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    const cellPixelStride = {
      width: (pixelWidth - 1) / this.width,
      height: (pixelHeight - 1) / this.height
    }
    const cellPixelDimensions = {
      width: cellPixelStride.width - (this.strokeWeight),
      height: cellPixelStride.height - (this.strokeWeight)
    }
    this.forEachCell((i, j, cell) => {
      const cellPosition = {
        x: x + (j * cellPixelStride.width + 1),
        y: y + (i * cellPixelStride.height + 1)
      }
      cell.drawSelf(
        cellPixelDimensions.width,
        cellPixelDimensions.height,
        cellPosition.x,
        cellPosition.y,
        p5
      )
    })
  }

  updateSelf (): void {

  }

  forEachCell (cellConsumer: (i: number, j: number, cell: Cell) => void): void {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const cell = this.getCellAt(i, j)
        if (cell !== undefined) {
          cellConsumer(i, j, cell)
        }
      }
    }
  }

  /**
     * This behavior should be modular since this is what determines
     * things like wrapping around.
     */
  getCellAt (i: number, j: number): Cell | undefined {
    if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
      return this.cells[i][j]
    }
    return undefined
  }
}
