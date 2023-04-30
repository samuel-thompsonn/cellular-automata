import type Agent from './Agent'
import type ObservableCell from './ObservableCell'

export default interface TraversableCell extends ObservableCell {
  attemptMove: (agent: Agent) => void
  leaveCell: (agent: Agent) => void
}
