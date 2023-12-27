import { useState } from 'react';

const Option = ({text, content}) => {
    const [visible, setVisible] = useState(false)

    return (
        <div>
        <button class="boardButton" onClick={() => setVisible(!visible)}> {text} </button>
        {visible ? content : null}
        </div>
    )
}

export default Option