import Option from './Option';

const GameOptions = ({optionArray}) => {
    return (
        <div className="gameOptions">
            {optionArray.map(option => {
                return <Option text={option.optionName} content={option.content}/>
            })
            }
        </div>
    )
}

export default GameOptions