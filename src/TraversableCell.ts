import type Agent from './Agent'

export default interface TraversableCell {
  attemptMove: (agent: Agent) => void
  leaveCell: (agent: Agent) => void
}
