import type * as P5 from 'p5'

export default interface CellularAutomaton {
  setup: (p5: P5) => void
  draw: (p5: P5) => void
}
