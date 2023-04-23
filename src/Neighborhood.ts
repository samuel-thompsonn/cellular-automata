import type Cell from './Cell'

export default interface Neighborhood {
  forEach: (cellConsumer: (cell: Cell) => void) => void
}
