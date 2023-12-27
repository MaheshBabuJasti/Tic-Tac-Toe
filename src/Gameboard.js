import React from 'react';

export default function Gameboard({onSelectSquare,board}){
    
    // const [gameBoard,setGameBoard]= React.useState(intialGameBoard)

    // function handlePlayerSymbol(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedGameBoard=[...prevGameBoard.map((innerValue)=>[...innerValue])];
    //         updatedGameBoard[rowIndex][colIndex]=activePlayerSymbol;
    //         return updatedGameBoard;
    //     })
    //     onSelectSquare();
        
    // }
    return(
    <ol id="game-board">
        {board.map((rows,rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                {rows.map((playerSymbol,colIndex)=>(
                    <li key={colIndex}><button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button></li>
                ))}
                </ol>
            </li>
        ))}
    </ol>
    )
}