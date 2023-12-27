import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import {Chess} from 'chess.js';
import BoardOptions from './components/BoardOptions';
import BoardHistory from './components/BoardHistory';
import GameOptions from './components/GameOptions';
import './index.css'
import { SketchPicker } from 'react-color';


const App = () => {
  const [game, setGame] = useState(new Chess());
  const [fromPieceSquare, setFromPieceSquare] = useState(null)
  const [squareStyles, setSquareStyles] = useState({})
  const [fen, setFen] = useState('start');
  const [orientation, setOrientation] = useState('white')
  const [gameInput, setGameInput] = useState(null)
  const [darkSquaresColor, setDarkSquaresColor] = useState({ backgroundColor: 'rgb(181, 136, 99)' });
  const [lightSquaresColor, setLightSquaresColor] = useState({ backgroundColor: 'rgb(240, 217, 181)' });

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


  const onResetBoard = () => {
    setGame(new Chess())
    setSquareStyles({})
    setFromPieceSquare(null)
    setFen('start')
  }


  const optionArray = [
    {
      optionName: 'Set Game',
      content: 
      <div>
        <input
            type="text"
            onChange={(event) => {setGameInput(event.target.value)}}
            id="fenInput"
            placeholder="Enter FEN string"
        />
        <button className="smallButton" onClick={() => {setFen(gameInput)}}>Submit</button>
      </div>
    },
    {
      optionName: 'Board Settings',
      content: 
      <div>
        <label>Light Square Colors</label>
          <SketchPicker color={lightSquaresColor} onChange={(color) => { setLightSquaresColor({backgroundColor: color.hex})}} />
        <label>Dark Square Colors</label>
          <SketchPicker color={darkSquaresColor} onChange={(color) => {setDarkSquaresColor({backgroundColor: color.hex})}} />
        <button onClick={() => {
          setDarkSquaresColor({ backgroundColor: 'rgb(181, 136, 99)' })
          setLightSquaresColor({ backgroundColor: 'rgb(240, 217, 181)' }) 
        }}> Reset to Default</button>
      </div>
    }
  ]

  return (
    <>
    <div className='board'>
      <GameOptions optionArray={optionArray}/>
      <Chessboard
        position={fen}
        draggable={false}
        width={500}
        onSquareClick={onSquareClick}
        squareStyles={squareStyles}
        orientation={orientation}
        darkSquareStyle={darkSquaresColor}
        lightSquareStyle={lightSquaresColor}
       />
      <div className='sidebar'>
        {/* 
        Temporarily removing this as entering a FEN string position does not have a history
        Will decide what to do with this later
        <BoardHistory history={game.history()}/> 
        */}
        <div className='boardOptions'>
          <BoardOptions onFlipBoard={() => {setOrientation(orientation === "white" ? "black" : "white")}} onResetBoard={onResetBoard} />
        </div>
      </div>
    </div>
    </>
  );
};

export default App
