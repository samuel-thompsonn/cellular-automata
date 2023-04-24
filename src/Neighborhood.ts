export default interface Neighborhood<CellType> {
  forEach: (consumer: (cell: CellType) => void) => void
  getTopElementByComparator: (comparator: (elementA: CellType, elementB: CellType) => number) => CellType
  getRandomElement: () => CellType
}
