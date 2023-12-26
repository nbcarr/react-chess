const BoardOptions = ({onFlipBoard, onResetBoard}) => {

    return(
        <>
            <button onClick={onResetBoard}> Reset Board </button>
            <button onClick={onFlipBoard}> Flip Board </button>
        </>
    )
}

export default BoardOptions