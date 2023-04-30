import type Neighborhood from './Neighborhood'
import type * as P5 from 'p5'
import type Agent from './Agent'
import type Cell from './Cell'
import AntAgent from './AntAgent'
import type AntCell from './AntCell'
import Pheromone from './Pheromone'

const MARGIN_PROPORTION = 0.10

enum CellState {
  EMPTY = 0,
  NEST = 1,
  FOOD = 2
}

function getNumberFromMapWithDefault (map: Map<Pheromone, number>, key: Pheromone, defaultValue: number): number {
  const valueFromMap = map.get(key)
  if (valueFromMap === undefined) {
    return defaultValue
  }
  return valueFromMap
}

export default class AntCellImpl implements Cell, AntCell {
  ants: Agent[]
  pheromoneValues: Map<Pheromone, number>
  state: CellState
  foodAmount: number // Only used as a nest; should each state have a different behavior class?

  constructor (state?: number) {
    this.foodAmount = 0
    switch (state) {
      case (0):
        this.state = CellState.EMPTY
        break
      case (1):
        this.state = CellState.NEST
        this.foodAmount = 1
        break
      case (2):
        this.state = CellState.FOOD
        this.foodAmount = 10
        break
      default:
        this.state = CellState.EMPTY
    }
    this.pheromoneValues = new Map()
    this.ants = []
  }

  getState (): number {
    return this.state
  }

  drawSelfEmpty (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    const maxVisualizedDistance = 200
    const homePheromoneValue = getNumberFromMapWithDefault(this.pheromoneValues, Pheromone.HOME, maxVisualizedDistance)
    const homeFillValue = (Math.max(maxVisualizedDistance - homePheromoneValue, 0) / maxVisualizedDistance) * 255
    const foodPheromoneValue = getNumberFromMapWithDefault(this.pheromoneValues, Pheromone.FOOD, maxVisualizedDistance)
    const foodFillValue = (Math.max(maxVisualizedDistance - foodPheromoneValue, 0) / maxVisualizedDistance) * 255
    p5.noStroke()
    p5.fill(p5.color(foodFillValue, homeFillValue, 0))
    p5.rect(x, y, pixelWidth, pixelHeight)
  }

  drawSelfNest (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    p5.noStroke()
    const fillColor = (this.foodAmount > 0) ? p5.color(100, 220, 100) : p5.color(50, 150, 50)
    p5.fill(fillColor)
    p5.rect(x, y, pixelWidth, pixelHeight)
  }

  drawSelfFood (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    p5.noStroke()
    p5.fill(p5.color(150, 50, 50))
    p5.rect(x, y, pixelWidth, pixelHeight)
  }

  drawSelf (pixelWidth: number, pixelHeight: number, x: number, y: number, p5: P5): void {
    if (this.state === CellState.EMPTY) {
      this.drawSelfEmpty(pixelWidth, pixelHeight, x, y, p5)
    } else if (this.state === CellState.NEST) {
      this.drawSelfNest(pixelWidth, pixelHeight, x, y, p5)
    } else if (this.state === CellState.FOOD) {
      this.drawSelfFood(pixelWidth, pixelHeight, x, y, p5)
    }
    if (this.ants.length > 0) {
      p5.fill(255, 200, 0)
      p5.rect(x + (pixelWidth * MARGIN_PROPORTION), y + (pixelHeight * MARGIN_PROPORTION), pixelWidth * (1 - (2 * MARGIN_PROPORTION)), pixelHeight * (1 - (2 * MARGIN_PROPORTION)))
    }
  }

  determineNextState (neighborhood: Neighborhood<Cell>): void {
    this.ants.forEach((ant) => { ant.determineNextAction(neighborhood) })
  }

  updateToNextState (): void {
    this.ants.forEach((ant) => { ant.executeUpdate() })
    if (this.state === CellState.NEST && this.foodAmount > 0) {
      this.ants.push(new AntAgent(this))
      this.foodAmount -= 1
    }
  }

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

  // A lower pheromone value overwrites the existing one
  addPheromone (pheremoneType: Pheromone, value: number): void {
    const currentPheromoneValue = this.pheromoneValues.get(pheremoneType)
    if (currentPheromoneValue !== undefined && value > currentPheromoneValue) {
      return
    }
    this.pheromoneValues.set(pheremoneType, value)
  }

  getPheromoneValue (pheromoneType: Pheromone): number {
    const returnValue = getNumberFromMapWithDefault(this.pheromoneValues, pheromoneType, 5000)
    return returnValue
  }

  addFood (foodAmount: number): void {
    if (foodAmount < 0) {
      throw Error(`Invalid food amount ${foodAmount} added to AntTile`)
    }
    this.foodAmount += foodAmount
  }

  removeFood (foodAmount: number): void {
    if (foodAmount < 0) {
      throw Error(`Invalid food amount ${foodAmount} removed from AntTile`)
    }
    if (this.foodAmount < foodAmount) {
      throw Error(`Attempted to take ${foodAmount} out of AntTile, but tile only has ${this.foodAmount} food`)
    }
    this.foodAmount -= foodAmount
    if (this.foodAmount === 0 && this.state === CellState.FOOD) {
      this.state = CellState.EMPTY
    }
  }
}
