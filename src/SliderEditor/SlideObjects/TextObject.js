import React from 'react'


function TextObject({value}) {
    const [text, setText] = React.useState(value)

    return <div contentEditable={true} onChange={(e) => setText(e.target.value)}>
        {text}
    </div>
}

export default TextObject;
