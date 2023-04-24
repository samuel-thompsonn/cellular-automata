export default interface Neighborhood<Type> {
  forEach: (consumer: (cell: Type) => void) => void
  getTopElementByComparator: (comparator: (elementA: Type, elementB: Type) => number) => Type
}
