import type * as P5 from 'p5'

export default interface Board {
  drawSelf: (p5: P5) => void
}
