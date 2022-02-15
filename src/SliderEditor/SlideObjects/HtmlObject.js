import React from 'react'


function HtmlObject({value}) {
    return     <div
        dangerouslySetInnerHTML={{__html: value}}
    />
}

export default HtmlObject;
