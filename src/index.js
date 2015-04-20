require('./polyfill')

const Ultrawave = require('ultrawave')
const React = require('react')
const App = require('./app')


// create some initial data

const initialData = {
  messages: [],

  players: {
    white: null,
    black: null
  },

  pieces: [

    // white
    {color: 'white', type: 'pawn',   position: [6, 0]},
    {color: 'white', type: 'pawn',   position: [6, 1]},
    {color: 'white', type: 'pawn',   position: [6, 2]},
    {color: 'white', type: 'pawn',   position: [6, 3]},
    {color: 'white', type: 'pawn',   position: [6, 4]},
    {color: 'white', type: 'pawn',   position: [6, 5]},
    {color: 'white', type: 'pawn',   position: [6, 6]},
    {color: 'white', type: 'pawn',   position: [6, 7]},
    {color: 'white', type: 'rook',   position: [7, 0]},
    {color: 'white', type: 'knight', position: [7, 1]},
    {color: 'white', type: 'bishop', position: [7, 2]},
    {color: 'white', type: 'queen',  position: [7, 3]},
    {color: 'white', type: 'king',   position: [7, 4]},
    {color: 'white', type: 'bishop', position: [7, 5]},
    {color: 'white', type: 'knight', position: [7, 6]},
    {color: 'white', type: 'rook',   position: [7, 7]},

    // black
    {color: 'black', type: 'pawn', position: [1, 0]},
    {color: 'black', type: 'pawn', position: [1, 1]},
    {color: 'black', type: 'pawn', position: [1, 2]},
    {color: 'black', type: 'pawn', position: [1, 3]},
    {color: 'black', type: 'pawn', position: [1, 4]},
    {color: 'black', type: 'pawn', position: [1, 5]},
    {color: 'black', type: 'pawn', position: [1, 6]},
    {color: 'black', type: 'pawn', position: [1, 7]},
    {color: 'black', type: 'rook',   position: [0, 0]},
    {color: 'black', type: 'knight', position: [0, 1]},
    {color: 'black', type: 'bishop', position: [0, 2]},
    {color: 'black', type: 'queen',  position: [0, 3]},
    {color: 'black', type: 'king',   position: [0, 4]},
    {color: 'black', type: 'bishop', position: [0, 5]},
    {color: 'black', type: 'knight', position: [0, 6]},
    {color: 'black', type: 'rook',   position: [0, 7]}

  ]
}


// connect to our peering server on port 8081

const ultrawave = new Ultrawave(`ws://${location.hostname}:8081`)


// create a group based on the pathname, update our react app when data changes

ultrawave
  .joinOrCreate(location.pathname, initialData, (data) => {
    React.render(<App data={data} self={ultrawave.id}/>, document.body)
  })
  //.catch((e) => console.log(e.stack))
