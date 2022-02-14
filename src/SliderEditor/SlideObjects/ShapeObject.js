import React from 'react'

function ShapeObject({value}) {
    const [shape, setShape] = React.useState(value);

    return <div contentEditable={true} onChange={(e) => setShape(e.target.value)}>
        <svg viewBox=" 0 0 100 100">
            <circle cx='50%' cy="50%" width="96%" height="96%" r="48%"/>
        </svg>
    </div>
}

export default ShapeObject;
