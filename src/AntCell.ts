import type Pheromone from './Pheromone'
import type TraversableCell from './TraversableCell'

export default interface AntCell extends TraversableCell {
  addPheromone: (pheremoneType: Pheromone, value: number) => void
  getPheromoneValue: (pheromoneType: Pheromone) => number
  addFood: (foodAmount: number) => void
  removeFood: (foodAmount: number) => void
}
