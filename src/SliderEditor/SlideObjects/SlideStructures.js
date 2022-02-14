import React from 'react';
import TextObject from './TextObject'
import ImageObject from "./ImageObject";
import ShapeObject from "./ShapeObject";


const SlideTypes = {
    textObject: 'textObject',
    shapeObject: 'shapeObject',
    chartObject: 'chartObject',
    imageObject: 'imageObject',
}

class SlideObject{
    type = null;
    value = null;
    constructor(type, value){
        this.type = type;
        this.value = value;
        console.log(this);
    }

    render = () => {
        console.log(this.type)
        switch (this.type){
            case SlideTypes.textObject:
                return <TextObject value={this.value} />
            case SlideTypes.imageObject:
                return <ImageObject value={this.value}/>
            case SlideTypes.shapeObject:
                return <ShapeObject value = {1}/>
        }

        return <div>Nope</div>
    }

}

export {SlideObject, SlideTypes}

