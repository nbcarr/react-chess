const BoardHistory = ({history}) => {

    const groupMoves = () => {
        const historyWithMoveNumbers = history.map((move, index) => ({moveNumber: index + 1, move}))
        const groupedMoves = [];
        for (let i = 0; i < historyWithMoveNumbers.length; i += 2) {
            const moveGroup = historyWithMoveNumbers.slice(i, i + 2);
            groupedMoves.push(moveGroup);
        }

        return (
            <ul>
                {groupedMoves.map((group, index) => (
                    <li key={index}>
                        {`${group[0].moveNumber}: ${group[0].move}`}
                        {group[1] && ` ${group[1].moveNumber}: ${group[1].move}`}
                    </li>
                ))}
            </ul>
        );
    }

    const displayHistory = () => {
        if (history.length === 0) {
            return <p> Starting Position</p>
        } else {
            return groupMoves()
    
        }
    }
    return (
        <div>
            {displayHistory()}
        </div>
    )
}

export default BoardHistory