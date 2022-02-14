import React from 'react';
import './slide.scss'
import ContentPanel from './ContentPanel'
import { SlideObject, SlideTypes, } from './SlideObjects/SlideStructures'

class SlideComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             objects: [new SlideObject(SlideTypes.textObject, "Some text here"),
            new SlideObject(SlideTypes.imageObject, "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"),
             new SlideObject(SlideTypes.shapeObject, 1)
             ],
            selectedObject: null
        }

        this.state.selectedObject = this.state.objects[0]

    }

    render = () => {
        return <div className='se_panel'>
            {
                this.state.objects.map(obj => <ContentPanel object={obj} selected={this.state.selectedObject == obj} onClick={() => this.setState({selectedObject: obj})}>
                </ContentPanel>)
            }
        </div>
    }
}

export default SlideComponent
