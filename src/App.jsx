import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import {Chess} from 'chess.js';
import BoardOptions from './components/BoardOptions';
import BoardHistory from './components/BoardHistory';
import GameOptions from './components/GameOptions';
import './index.css'

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [fromPieceSquare, setFromPieceSquare] = useState(null)
  const [squareStyles, setSquareStyles] = useState({})
  const [fen, setFen] = useState('start');
  const [orientation, setOrientation] = useState('white')

  const selectedSquareStyle = (square) => {
    return { [square]: {backgroundColor: "rgba(255, 255, 0, .25)"} }
  }

  const onSquareClick = (square) => {
    if (!fromPieceSquare) {
      setFromPieceSquare(square)
      setSquareStyles(selectedSquareStyle(square))
      return;
    }
    try {
      // Legal move
      game.move({
        from: fromPieceSquare,
        to: square
      })
      setFromPieceSquare(null)
      setFen(game.fen())
      setSquareStyles(selectedSquareStyle(square))

      
    } catch(err) {
      // Illegal move
      setFromPieceSquare(null)
      setSquareStyles({})
    }    
  }

  const onFlipBoard = () => {
    setOrientation(orientation === "white" ? "black" : "white")
  }

  const onResetBoard = () => {
    setGame(new Chess())
    setFen('start')
  }

  return (
    <>
    <div className='board'>
      <GameOptions />
      <Chessboard
        position={fen}
        draggable={false}
        width={500}
        onSquareClick={onSquareClick}
        squareStyles={squareStyles}
        orientation={orientation}
      />
      <div className='sidebar'>
        <BoardHistory history={game.history()}/>
        <div className='boardOptions'>
          <BoardOptions onFlipBoard={onFlipBoard} onResetBoard={onResetBoard} />
        </div>
      </div>
    </div>
    </>
  );
};

export default App
