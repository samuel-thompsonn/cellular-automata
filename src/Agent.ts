import type Neighborhood from './Neighborhood'
import type TraversableCell from './TraversableCell'

export default interface Agent {
  // Determines next state, effects on tiles it's on, and next move
  determineNextAction: (neighborhood: Neighborhood<TraversableCell>) => void
  executeUpdate: () => void
}
