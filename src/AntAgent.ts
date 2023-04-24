import type Agent from './Agent'
import type Neighborhood from './Neighborhood'
import type TraversableCell from './TraversableCell'

export default class AntAgent implements Agent {
  currentCell: TraversableCell
  destinationCell: TraversableCell | undefined

  constructor () {
    this.destinationCell = undefined
  }

  determineNextAction (neighborhood: Neighborhood<TraversableCell>): void {
    this.destinationCell = neighborhood.getTopElementByComparator(() => Math.random() - 0.50)
  }

  executeUpdate (): void {
    if (this.destinationCell !== undefined) {
      this.destinationCell.attemptMove(this)
      this.currentCell.leaveCell(this)
      this.currentCell = this.destinationCell
      this.destinationCell = undefined
    }
  }
}
