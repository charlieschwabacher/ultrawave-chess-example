# Ultrawave Chess Example

This is a multiplayer chess game using [ultrawave](//github.com/charlieschwabacher/ultrawave)
to synchronize game state over WebRTC data channels.  You can [**try playing here**](//charlieschwabacher.github.io/ultrawave-chess-example) (the example is hosted on the free tier of openshift and gets shut down after a period of inactivity, so if it doesn't work on the first try, give the server a minute to spin up and try again).

Games are identified using the query string - the first user to connect with a given query string will create a game and play as white.  The second will play as black, and any subsequent users will be observers (able to join in the chat, but unable to move pieces).

The game is entirely peer to peer, with no data sent to the server.  Once a game is done and everyone has closed the tab, its query string will be available again for a new game.

To run locally, `npm install` and `npm start`, and visit [localhost:8080](http://localhost:8080/).

The source is es6 and css4 - after editing, `npm run build` to compile w/ babel and cssnext.
