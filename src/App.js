import Gameboard from "./Gameboard.js"
import Header from "./Header.js"
import Log from "./Log.js"
import Player from "./Player.js"
import React from 'react'
import { WINNING_COMBINATIONS } from "./winning-combinations.js"
import Gameover from "./Gameover.js";
const intialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
  
]

function deriveActivePlayer(gameTurns){
      let currentPlayer='X';
      
      if (gameTurns.length>0 && gameTurns[0].player==='X'){
        currentPlayer='O';
      }
      return currentPlayer
}
function App() {
  const [players,setPlayers]=React.useState({
    X:'Player 1',
    O:'Player 2'
  });
  const [gameTurns,setGameTurns]=React.useState([])
  // const [activePlayer, setActivePlayer]=React.useState('X')
  const activePlayer=deriveActivePlayer(gameTurns);

  const gameBoard=[...intialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns){
        const {square,player}=turn;
        const {row,col}=square
        gameBoard[row][col]=player
    }
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol=gameBoard[combination[2].row][combination[2].column]

    if(firstSymbol && firstSymbol===secondSymbol && firstSymbol===thirdSymbol){
      winner=players[firstSymbol];
    }
  }

  const isDraw=gameTurns.length ===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((curActiveplayer)=>(curActiveplayer==='X'?'O':'X'))
    setGameTurns(prevTurn=>{
      const currentPlayer=deriveActivePlayer(prevTurn)
      const updatedTurn=[
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurn];
      return updatedTurn;
    })
  }
  
  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerName(symbol,nName){
    setPlayers(prevPlayer=>{
      return {
        ...prevPlayer,
        [symbol]:nName
      }

    })

  }

  return (
    <>
    <Header />
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="PLAYER1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName}/>
          <Player name="PLAYER2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerName}/>
        </ol>
        {(winner || isDraw) && <Gameover winner={winner} onRestart={handleRestart}/>}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>

    </main>
    </>

  )
}

export default App