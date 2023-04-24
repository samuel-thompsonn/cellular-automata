import type Neighborhood from './Neighborhood'

export default class NeighborhoodImpl<CellType> implements Neighborhood<CellType> {
  elements: CellType[]

  constructor (elements: CellType[]) {
    this.elements = elements
  }

  forEach (consumer: (element: CellType) => void): void {
    this.elements.forEach((element) => { consumer(element) })
  }

  getTopElementByComparator (comparator: (elementA: CellType, elementB: CellType) => number): CellType {
    this.elements.sort(comparator)
    return this.elements[0]
  }

  getRandomElement: () => CellType = () => {
    return this.elements[Math.floor(Math.random() * this.elements.length)]
  }
}
