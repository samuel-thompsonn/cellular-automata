import type TraversableCell from './TraversableCell'
import type UpdatableCell from './UpdatableCell'

export default interface Cell extends UpdatableCell, TraversableCell { }
