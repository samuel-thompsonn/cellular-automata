import * as P5 from 'p5'
import CellularAutomatonImpl from './CellularAutomatonImpl'

const cellularAutomaton = new CellularAutomatonImpl()

export const sketch = (p5: P5): void => {
  p5.setup = () => {
    cellularAutomaton.setup(p5)
  }

  p5.draw = () => {
    cellularAutomaton.draw(p5)
  }
}

export const myP5 = new P5(sketch, document.body)
