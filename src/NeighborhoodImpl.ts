import type Cell from './Cell'
import type Neighborhood from './Neighborhood'

export default class NeighborhoodImpl implements Neighborhood {
  cells: Cell[]

  constructor (cells: Cell[]) {
    this.cells = cells
  }

  forEach (cellConsumer: (cell: Cell) => void): void {
    this.cells.forEach((cell) => { cellConsumer(cell) })
  }
}
