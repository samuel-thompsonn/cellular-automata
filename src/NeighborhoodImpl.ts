import type Neighborhood from './Neighborhood'

export default class NeighborhoodImpl<Type> implements Neighborhood<Type> {
  elements: Type[]

  constructor (elements: Type[]) {
    this.elements = elements
  }

  forEach (consumer: (element: Type) => void): void {
    this.elements.forEach((element) => { consumer(element) })
  }

  getTopElementByComparator (comparator: (elementA: Type, elementB: Type) => number): Type {
    this.elements.sort(comparator)
    return this.elements[0]
  }
}
