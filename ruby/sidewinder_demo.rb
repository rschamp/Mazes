require 'grid'
require 'sidewinder'

grid = Grid.new(15, 15)
Sidewinder.on(grid)

img = grid.to_png
img.save('maze.png')