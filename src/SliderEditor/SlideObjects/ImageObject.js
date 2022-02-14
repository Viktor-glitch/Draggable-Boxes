import React from 'react'


function ImageObject({value}) {
    const [image, setImage] = React.useState(value)

    return <div contentEditable={true} onChange={(e) => setImage(e.target.value)}>
        <img src={image} />
    </div>
}

export default ImageObject;
