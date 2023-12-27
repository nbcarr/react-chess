const BoardOptions = ({onFlipBoard, onResetBoard}) => {

    return(
        <>
            <button class="boardButton" onClick={onResetBoard}> Reset Board </button>
            <button class="boardButton" onClick={onFlipBoard}> Flip Board </button>
        </>
    )
}

export default BoardOptions