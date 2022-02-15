import React from 'react';
import './slide.scss'
import ContentPanel from './ContentPanel'
import { SlideObject, SlideTypes, } from './SlideObjects/SlideStructures'
import ImageObject from "./SlideObjects/ImageObject";

class SlideComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             objects: [],
            selectedObject: null
        }

        this.state.selectedObject = this.state.objects[0]
    }


    addCircle = () => {
        console.log('addCircle');
        this.state.objects.push(new SlideObject(SlideTypes.shapeObject, 1));
        this.forceUpdate();
    }
    addText = () => {
        this.state.objects.push(new SlideObject(SlideTypes.textObject, "Some text here"));
        this.forceUpdate();
    }

    addTable = () => {
        this.state.objects.push(new SlideObject(SlideTypes.tableObject, 1));
        this.forceUpdate();
    }

    addChart = () => {
        this.state.objects.push(new SlideObject(SlideTypes.chartObject,0));
        this.forceUpdate();
    }

    addImg = () => {
        this.state.objects.push(new SlideObject(SlideTypes.imageObject, "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"));
        this.forceUpdate();
    }

    handlePaste = (event) =>{
        if(event.clipboardData.items[0]){
            if(event.clipboardData.items[0].type.includes("html")){
                this.state.objects.push(new SlideObject(SlideTypes.htmlObject, event.clipboardData.getData('Text')));
                console.log("I got HTML");
                this.forceUpdate();
            }else if(event.clipboardData.items[0].type.includes("text")){
                this.state.objects.push(new SlideObject(SlideTypes.textObject, event.clipboardData.getData('text/plain')));
                this.forceUpdate();
            }

        }else if(event.clipboardData.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.clipboardData.files[0]);
            var base64data;
            reader.onloadend = () => {
                base64data = reader.result;
                //console.log('here', base64data);
                // console.log(base64data);
                this.state.objects.push(new SlideObject(SlideTypes.imageObject, base64data));
                this.forceUpdate();
            }
        }

        // console.log('event', event.clipboardData.getData('image/png'));
        // console.log("I was in paste!")
        // if (event.clipboardData.items != null) {
        //     for (var i=0; i < event.clipboardData.items.length; i++) {
        //         console.log("... items[" + i + "].kind = " + event.clipboardData.items[i].kind + " ; type = " + event.clipboardData.items[i].type);
        //     }
        // }
        // // this.state.objects.push(new ImageObject());
        // this.forceUpdate();
        // event.clipboardData.clearData();
        //
        // const dT = event.clipboardData || window.clipboardData;
        // const file = dT.files[ 0 ];
        // console.log( file );
    }



    render = () => {
        return <div className='se_panel' onPaste={this.handlePaste}>
                <nav>
                    <button id="addCircleButton" onClick={() => this.addCircle()}>
                        <svg viewBox=" 0 6 100 100">
                            <circle cx='50%' cy="50%" width="80px" height="80px" r="40px"/>
                        </svg>
                    </button>
                    <button id="addImgButton" onClick={this.addImg}>
                        Image
                    </button>
                    <button id="addTextButton" onClick={this.addText}>
                        Text
                    </button>
                    <button id="addTableButton" onClick={this.addTable}>
                        Table
                    </button>
                    <button id="addChartButton" onClick={this.addChart}>
                        Chart
                    </button>
                </nav>
            {
                this.state.objects.map(obj => <ContentPanel object={obj} selected={this.state.selectedObject == obj} onClick={() => this.setState({selectedObject: obj})}>
                </ContentPanel>)

            }
        </div>
    }
}

export default SlideComponent
