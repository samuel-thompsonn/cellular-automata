export default interface Neighborhood<CellType> {
  forEach: (consumer: (cell: CellType) => void) => void
  getTopElementByComparator: (comparator: (elementA: CellType, elementB: CellType) => CellType) => CellType
  getRandomElement: () => CellType
}
