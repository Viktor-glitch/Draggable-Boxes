import React, {useState, useEffect} from 'react';
import SlideStructures from './SlideComponent.js';



function ContentPanel({selected, object,onClick}) {

    const mainPanel = React.useRef(null);
    const [mouseAction, setMouseAction] = React.useState(false);

    const onMouseUpMove = () => {
        console.log('onMouseUp');
        setMouseAction(false);
        window.removeEventListener("mousemove", mouseMoveMove);
        window.removeEventListener("mouseup", onMouseUpMove);
    }
    const onMouseUpRotate = () => {
        console.log('onMouseUp');
        setMouseAction(false);
        window.removeEventListener("mousemove", mouseMoveRotate);
        window.removeEventListener("mouseup", onMouseUpRotate);
    }
    const onMouseUpResize = () => {
        console.log('onMouseUp');
        setMouseAction(false);
        window.removeEventListener("mousemove", mouseMoveResize);
        window.removeEventListener("mouseup", onMouseUpResize);
    }

    const onMouseUpSelect = () => {
        console.log('onMouseUp');
        setMouseAction(false);
        window.removeEventListener("mousemove", mouseMoveSelect);
        window.removeEventListener("mouseup", onMouseUpSelect);
    }

    const mouseMoveMove = ({movementX, movementY}) => {
        console.log('mouseMove',movementX,movementY);

        if(mainPanel.current){
            const {x,y} = mainPanel.current.getBoundingClientRect();
            move(x,y,movementX,movementY);
        }
    }
    const mouseMoveResize = ({movementX, movementY}) => {
        console.log('mouseMove',movementX,movementY);

        if(mainPanel.current){
            const {x,y} = mainPanel.current.getBoundingClientRect();
            resize(x,y,movementX,movementY);
        }
    }
    const mouseMoveRotate = (event) => {
        console.log('mouseMove',event.pageX,event.pageY);

        if(mainPanel.current){
            const {x,y} = mainPanel.current.getBoundingClientRect();
            rotate(x,y,event.pageX,event.pageY);
        }
    }

    const mouseMoveSelect = (event) => {

        event.target.selected=true;
    }

    const move = (x,y,movementX,movementY) => {
        object.x = movementX + x;
        object.y = movementY + y;
        mainPanel.current.style.left = object.x + 'px';
        mainPanel.current.style.top = object.y  + 'px';
        console.log('I moved');
    }

    const rotate = (x,y,movementX,movementY) => {
        let delta_x = movementX - Number(x) - Number(mainPanel.current.style.width.slice(0,-2))/2;//touch_x - center_x
        let delta_y = Number(mainPanel.current.style.width.slice(0,-2))/2 + Number(y) - movementY;//center_y - touch_y;
        let theta_radians = Math.atan2(delta_y, delta_x);

        if (theta_radians < 0)
            theta_radians = Math.abs(theta_radians);
        else
            theta_radians = 2 * Math.PI - theta_radians;

        let startingRotationValue = 0;
        theta_radians+=Number(startingRotationValue)-1.570796;
        mainPanel.current.style.transform = "rotate(" + theta_radians + "rad)";
    }

    const resize = (x,y,movementX,movementY) => {
        mainPanel.current.style.width = Number(mainPanel.current.style.width.slice(0,-2)) + movementX + 'px';
        mainPanel.current.style.height = Number(mainPanel.current.style.height.slice(0,-2)) + movementY + 'px';
    }

    const onMouseDown = (mouseAction) => {
        console.log('mouseAction = '+mouseAction);
        console.log('onMouseDown');
        setMouseAction(mouseAction);

        if(mouseAction==='move') {
            window.addEventListener("mousemove", mouseMoveMove)
            window.addEventListener("mouseup", onMouseUpMove)
        } else if(mouseAction==='rotate') {
            window.addEventListener("mousemove", mouseMoveRotate)
            window.addEventListener("mouseup", onMouseUpRotate)
        } else if(mouseAction==="resize"){
            window.addEventListener("mousemove", mouseMoveResize)
            window.addEventListener("mouseup", onMouseUpResize)
        } else {
            window.addEventListener("mousemove", mouseMoveSelect)
            window.addEventListener("mouseup", onMouseUpSelect)
        }
    }

    console.log('ContentPanel.render')

    if(selected) {

        return <div className="cp_main_panel" style={{width: '100px', height: '100px'}} ref={mainPanel}>
            <div className="cp_left"></div>
            <div className="cp_top"></div>
            <div className="cp_right"></div>
            <div className="cp_bottom"></div>
            <div className="cp_topLeft"></div>
            <div className="cp_topRight"></div>
            <div className="cp_bottomRight" onMouseDown={() => onMouseDown("resize")}></div>
            <div className="cp_bottomLeft"></div>
            <div className="cp_move" onMouseDown={() => onMouseDown("move")}></div>
            <div className="cp_rotate" onMouseDown={() => onMouseDown("rotate")}></div>
            {object.render()}
        </div>
    }
    else{

        return <div className="cp_main_panel" style={{width: '100px', height: '100px'}} ref={mainPanel} onClick={onClick}>
            {object.render()}
        </div>

    }
}

export default ContentPanel;
