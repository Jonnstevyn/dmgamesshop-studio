import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ubi4x431',
  dataset: 'production',
  token: 'skW60KMeEa7HdV9sXhphkpzTm6P0QbcAo7922IgxKdalNDR5pmpgUJ9QOUki17pmXHBEBsBw6jlbQoVO2ZH6zVh3ptoDvb8nfYkQyG7I4d89mf8AZywwLCeZ19fLTBaJL1SFQlyVGg0L6SNP6zNwMBctinoTqU7BaNbJ3DAVjrSyRpIYczHq',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const howToPlayData = [
  { name: 'Dominoes', image: 'https://img.lakeshorelearning.com/is/image/OCProduction/fg524?wid=800&fmt=jpeg', rules: 'One player begins by downing one of their tiles. This tile starts the line of play, a series of tiles in which adjacent tiles touch with matching values. The players alternately extend the line of play, with one tile at one of its two ends. The game ends when one player wins by playing their last tile, or when the game is blocked because neither player can play.' },
  { name: 'Ludo', image: 'https://m.media-amazon.com/images/I/71cOd5YI8lL._AC_SL1500_.jpg', rules: 'Players take turns rolling a single die. To get a piece out of the starting base, a player must roll a six. Pieces move clockwise around the board toward their home column. If a player lands on an opponent\'s piece, the opponent\'s piece is sent back to its base. Rolling a six grants the player an extra roll. The first player to move all four of their pieces into the center home triangle wins.' },
  { name: 'Chess', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8nQVh0qk903GHfTr26Pqse228fEJCnIB6Q&s', rules: 'The game is played on an 8x8 board. White moves first, then players alternate turns. Each piece has a unique movement pattern. The goal is to checkmate the opponent\'s King, meaning the King is under immediate attack and has no legal way to escape capture.' },
  { name: 'Bingo', image: 'https://m.media-amazon.com/images/I/61kA16Eb0iL._AC_SL1322_.jpg', rules: 'Each player receives a card with a grid of numbers under the letters B-I-N-G-O, with the center square being a free space. A caller randomly draws and announces letter-number combinations. Players cover the corresponding square on their card. The first player to cover five squares in a row shouts Bingo to win.' },
  { name: 'Dos', image: 'https://m.media-amazon.com/images/I/819eND5NJlL.jpg', rules: 'Players are dealt seven cards and two cards are placed face-up to form a Center Row. On your turn, you play a card to match a number in the Center Row. You can match with one card or use two cards that add up to the number. The goal is to be the first to play all your cards. When you have two cards remaining, shout Dos!' },
  { name: 'Jenga', image: 'https://beautifulrealizations.wordpress.com/wp-content/uploads/2013/02/jenga-1.jpg', rules: 'The game starts with a tower built of 54 wooden blocks, three per layer. Players take turns removing a single block from any level below the highest completed level and placing it on top. The player who causes the tower to fall loses the game.' },
  { name: 'Scrabble', image: 'https://media.istockphoto.com/id/487051045/photo/scrabble-board-game.jpg?s=612x612&w=0&k=20&c=cob1XOSywaD9c7HyuXGWEIqcEnpyJoHTD5kILc4cwcQ=', rules: 'Players draw seven letter tiles and take turns forming words crossword-style on the board to score points. The first word must cover the center star square. Subsequent words must use a tile already on the board. The player with the highest score when the tiles run out wins.' },
  { name: 'Mancala', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDtStoDvacZgvDhMM_C2Bl8sMVf3QHEQNZQTy8juKrQ&s=10', rules: 'Mancala is a two-player turn-based strategy board game where players aim to capture more seeds than their opponent. It is played by moving seeds around rows of pits in a process called sowing.' },
  { name: 'Skip-Bo', image: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/37/2344603/1.jpg?4946', rules: 'The object of the game is for players to be the first to use all the cards in their Stockpile. Players build up to four shared Building Piles in numerical sequence from 1 to 12. Each turn, players draw until they have five cards in their hand, then play cards onto the Building Piles. The first player to empty their Stockpile wins.' },
  { name: 'Uno', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Uno_cards_deck.svg/400px-Uno_cards_deck.svg.png', rules: 'One player begins by matching the top card of the discard pile by color, number, or symbol. Action and Wild cards change the game flow. The first player to play their last card wins, but they must shout UNO when they have one card remaining.' },
]

console.log(`Importing ${howToPlayData.length} how-to-play entries...`)

let success = 0
for (const entry of howToPlayData) {
  const slug = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  try {
    await client.createOrReplace({
      _type: 'howToPlay',
      _id: `howtoplay-${slug}`,
      name: entry.name,
      image: entry.image,
      rules: entry.rules,
    })
    console.log(`✅ ${entry.name}`)
    success++
  } catch (err) {
    console.error(`❌ ${entry.name}: ${err.message}`)
  }
}
console.log(`\n🎉 Done! ${success} imported.`)
