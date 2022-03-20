# MangoTrees
MangoTrees Solitaire with a very light GUI


## Thoughts

I made this quickly as a weekend snack, and have in retrospect chosen some rough paths in order to add the current functionality

My first thought is that by changing the id's of the tiles, I could save a lot of coding. The logic used in order to check neighboring tiles got way more complicated than required. If the id's instead was a representation of a coordinate (example 'marked' started at id="44"), it wouldn't be needed to check modula etc.

I also ran into some problems with getting an int value of the id's, which was covered over with over usage of variable 'marked'. As far as I am awave, the amount of global variables is high, and could easily be avoided/replaced

## TODO

As mentioned, this was a quick project with not too much effort put down, thus the GUI, but if I were to continue to work on this project, I would:

- Change tiles id's to coordinate representation
- Improve the GUI
- Change variable/method names and add comments to each method
- Reduce variable count


