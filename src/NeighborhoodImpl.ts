import type Neighborhood from './Neighborhood'

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffleArray (array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

export default class NeighborhoodImpl<CellType> implements Neighborhood<CellType> {
  elements: CellType[]

  constructor (elements: CellType[]) {
    this.elements = elements
  }

  forEach (consumer: (element: CellType) => void): void {
    this.elements.forEach((element) => { consumer(element) })
  }

  getTopElementByComparator (comparator: (elementA: CellType, elementB: CellType) => CellType): CellType {
    shuffleArray(this.elements)
    this.elements.sort((cellA, cellB) => {
      const winningCell = comparator(cellA, cellB)
      switch (winningCell) {
        case (cellA):
          return -1
        case (cellB):
          return 1
        default:
          return 0
      }
    })
    return this.elements[0]
  }

  getRandomElement: () => CellType = () => {
    return this.elements[Math.floor(Math.random() * this.elements.length)]
  }
}
