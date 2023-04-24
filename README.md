https://webpack.js.org/guides/getting-started/
https://webpack.js.org/guides/typescript/#basic-setup
https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder

## Simulations

### Rock, Paper, Scissors

### Ants

In the simulation, we will see ants explore an environment and find food, using pheremones to form an ant trail from the food back to their nest.

An ant moves each update. If it doesn't have food, it attempts to move towards food. If it has food, it attempts to move toward home. It determines the location of home and food by reading pheremones left on the tiles in its neighborhood, and it deposits pheromone onto its own tile to help itself and others track down food and bring it home.

An ant starts on its nest, in the food-seeking behavior mode. It has an internal tracker of how many turns *t* it has been in this mode. Each turn, it drops a homing pheromone with value *t* on its current tile and moves to its next desired tile. It sorts its tiles in the following way:

  1. Tiles with food.
  1. Tiles with food pheromone. Tiles whose food pheromone has a lower value are higher priority.
  2. Tiles without homing pheromone. Tiles with a larger homing value have higher priority.
  3. Other passable tiles, randomly ordered.

Once the ant is on a tile with food, it collects the food and enters the nest-seeking mode. As with food-seeking, the ant has an internal tracker of how many turns *t* it has been in this mode, and drops a food pheromone with value *t* on its current tile before moving. It sorts tiles in the following way:

  1. Nest tile.
  1. Tiles with homing pheromone. Tiles whose food pheromone has a lower value are higher priority.
  2. Tiles without food pheromone. Tiles with a larger homing value have higher priority.
  3. Other passable tiles, randomly ordered.

It picks the highest tile by this sorting system and moves to it each turn. Once it reaches the nest, it drops off its food and returns to homing behavior mode.

## Design

### Executing an agent move

Each cell has a list of Agents. On each update, the cell tells its Agents to update, giving it a list of Cells for information as well as an interface on Cells that allow it to queue up a move. In the execution phase, the cell can determine whether the move can take place, and if it can, the Agent moves, notifying its previous owner cell that it is no longer present.

### Cell typing

AntCells really ought to take in a neighborhood of AntCells, rather than taking in a neighborhood of cells. But there is no reason that the Board should know the cell type. So probably the best solution involves parameterized classes. There can be a CellUpdateBehavior interface, which is parameterized and accessed by the board. Then each AntCell can own a `AntCellUpdateBehavior implements CellUpdateBehavior<AntCell>`, and use its update function on the input neighborhood. But in that case, how would the neighborhood be gathered up and delivered while protecting its typing? Well, we can have a generic neighborhood finder like `NeighborhoodFinder<CellType extends UpdatableCell>` and use that to put together the neighborhood. And make the Board also parameterized--`Board<CellType extends UpdatableCell>`--so that the top-level method (or reflection) is the only one that needs to know the concrete cell type. That sounds great and exciting!
