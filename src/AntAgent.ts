import type Agent from './Agent'
import type AntCell from './AntCell'
import type Neighborhood from './Neighborhood'
import Pheromone from './Pheromone'

enum BehaviorState {
  FIND_FOOD = Pheromone.HOME,
  RETURN_HOME = Pheromone.FOOD
}

export default class AntAgent implements Agent {
  currentCell: AntCell
  destinationCell: AntCell | undefined
  behaviorState: BehaviorState
  turnCounter: number
  hasFood: boolean

  constructor (startingCell: AntCell) {
    this.currentCell = startingCell
    this.destinationCell = undefined
    this.behaviorState = BehaviorState.FIND_FOOD
    this.turnCounter = 0
    this.hasFood = false
  }

  determineNextAction (neighborhood: Neighborhood<AntCell>): void {
    // if (this.currentCell.getState() === 1) {
    //   this.behaviorState = BehaviorState.RETURNING_HOME
    // }
    switch (this.currentCell.getState()) {
      case (1):
        this.turnCounter = 0
        this.behaviorState = BehaviorState.FIND_FOOD
        if (this.hasFood) {
          this.currentCell.addFood(1)
          this.hasFood = false
        }
        break
      case (2):
        this.turnCounter = 0
        this.behaviorState = BehaviorState.RETURN_HOME
        if (!this.hasFood) {
          this.currentCell.removeFood(1)
          this.hasFood = true
        }
        break
    }
    if (this.behaviorState === BehaviorState.FIND_FOOD) {
      console.log('Behavior state: Find food')
    } else {
      console.log('Behavor state: Return home')
    }
    console.log(`Behavior state: ${this.behaviorState}`)
    switch (this.behaviorState) {
      case (BehaviorState.FIND_FOOD):
        this.determineNextActionFindingFood(neighborhood)
        break
      case (BehaviorState.RETURN_HOME):
        this.determineNextActionReturningHome(neighborhood)
        break
    }
  }

  // TODO: Make this sort the cells according to their type and pheromones.
  //   Mainly, prioritize food. Next, make a version of this method for
  //   finding home that follows home pheromones.
  determineNextActionFindingFood (neighborhood: Neighborhood<AntCell>): void {
    console.log('Determining next action for finding food!')
    this.destinationCell = neighborhood.getTopElementByComparator((cellA, cellB) => {
      if (cellA.getState() === 2) {
        return cellA
      }
      if (cellB.getState() === 2) {
        return cellB
      }
      if (cellA.getPheromoneValue(Pheromone.FOOD) < cellB.getPheromoneValue(Pheromone.FOOD)) {
        if (Math.random() > 0.10) {
          return cellA
        }
        return cellB
      } else if (cellA.getPheromoneValue(Pheromone.FOOD) < cellB.getPheromoneValue(Pheromone.FOOD)) {
        if (Math.random() > 0.10) {
          return cellB
        }
        return cellA
      }
      // } else if (cellA.getPheromoneValue(Pheromone.HOME) > cellB.getPheromoneValue(Pheromone.HOME)) {
      //   if (Math.random() > 0.10) {
      //     return cellA
      //   }
      //   return cellB
      // }
      return cellB
    })
  }

  determineNextActionReturningHome (neighborhood: Neighborhood<AntCell>): void {
    this.destinationCell = neighborhood.getTopElementByComparator((cellA, cellB) => {
      if (cellA.getState() === 1) {
        return cellA
      }
      if (cellB.getState() === 1) {
        return cellB
      }
      if (cellA.getPheromoneValue(Pheromone.HOME) < cellB.getPheromoneValue(Pheromone.HOME)) {
        if (Math.random() > 0.10) {
          return cellA
        }
        return cellB
      }
      return cellB
    })
  }

  executeUpdate (): void {
    this.currentCell.addPheromone(this.behaviorState.valueOf(), this.turnCounter)
    this.turnCounter += 1
    if (this.destinationCell !== undefined) {
      this.destinationCell.attemptMove(this)
      this.currentCell.leaveCell(this)
      this.currentCell = this.destinationCell
      this.destinationCell = undefined
    }
  }
}
