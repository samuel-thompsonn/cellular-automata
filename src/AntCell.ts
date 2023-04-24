import type Neighborhood from './Neighborhood'
import type * as P5 from 'p5'
import type Agent from './Agent'
import type Cell from './Cell'

export default class AntCell implements Cell {
  ants: Agent[]

  constructor () {
    this.ants = []
  }

  getState (): number {
    return 0
  }

  drawSelf (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    p5.noStroke()
    p5.fill(p5.color(10, 10, 10))
    p5.rect(x, y, pixelWidth, pixelHeight)
  }

  determineNextState (neighborhood: Neighborhood<Cell>): void {
    this.ants.forEach((ant) => { ant.determineNextAction(neighborhood) })
  }

  etermineNextState (neighborhood: Neighborhood<Cell>): void {
    this.ants.forEach((ant) => { ant.determineNextAction(neighborhood) })
  }

  updateToNextState (): void {}

  // Throws an error if the move cannot be carried out
  attemptMove (agent: Agent): void {
    if (this.ants.includes(agent)) {
      throw new Error('An agent is attempting to move to this cell but is already here!')
    }
    this.ants.push(agent)
  }

  leaveCell (agent: Agent): void {
    const agentIndex = this.ants.findIndex((agentInList) => agentInList === agent)
    if (agentIndex !== -1) {
      this.ants.splice(agentIndex, 1)
    } else {
      throw new Error('An agent is attempting to leave a cell it is not part of!')
    }
  }
}
