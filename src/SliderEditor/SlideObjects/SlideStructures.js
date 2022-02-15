import React from 'react';
import TextObject from './TextObject'
import ImageObject from "./ImageObject";
import ShapeObject from "./ShapeObject";
import HtmlObject from "./HtmlObject";
import TableObject from './TableObject'
import ChartObject from './ChartObject'


const SlideTypes = {
    textObject: 'textObject',
    shapeObject: 'shapeObject',
    chartObject: 'chartObject',
    imageObject: 'imageObject',
    htmlObject: 'htmlObject',
    tableObject: 'tableObject',
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
            case SlideTypes.htmlObject:
                return <HtmlObject value={this.value}/>
            case SlideTypes.tableObject:
                return <TableObject value={this.value} />
            case SlideTypes.chartObject:
                return <ChartObject value={this.value} />

        }

        return <div>Nope</div>
    }

}

export {SlideObject, SlideTypes}

