document.onmouseup = handleMouseUp;
let xAxis = 5;
let yAxis = 5;
let highestZIndex = 0;
let currentID = '0';
let numberOfBoxes = 0;
let xPoint = 5;
let yPoint = 5;
let startingWidth = 100;
let startingHeight = 100;

function rotate(event){
    console.log("I am rotaaating!!!!");
    let delta_x = event.pageX - (xPoint + 55);//touch_x - center_x
    let delta_y =  (yPoint + 55) - event.pageY;//center_y - touch_y;
    let theta_radians = Math.atan2(delta_y, delta_x);

    if (theta_radians < 0)
        theta_radians = Math.abs(theta_radians);
    else
        theta_radians = 2 * Math.PI - theta_radians;
    document.getElementById(currentID).style.transform = "rotate(" + theta_radians + "rad)";
    document.getElementById(('u'+currentID).toString()).style.transform = "rotate(" + theta_radians + "rad)";
    document.getElementById(('b'+currentID).toString()).style.transform = "rotate(" + theta_radians + "rad)";
    console.log(theta_radians);
}

function onHoverUnderBox(){
    let myUnderBox = document.getElementById('u'+currentID);
    myUnderBox.style.cursor= 'nwse-resize';
}

function myResizeFunction(event) {
    xAxis=event.pageX;
    yAxis=event.pageY;
    console.log("Mouse is resizing BOX!");
    let myBox=document.getElementById(currentID);
    let x = xAxis +'px';
    let y = yAxis + 'px';
    console.log(x);
    xPoint=xAxis;
    yPoint=yAxis;

    myBox.style.width+=wrapperForStylePx(xAxis);//x;
    myBox.style.height+=wrapperForStylePx(yAxis);//y;


    document.getElementById(('u'+currentID).toString()).style.width = wrapperForStylePx(startingWidth+xAxis +100);
    document.getElementById(('u'+currentID).toString()).style.height = wrapperForStylePx(startingHeight+yAxis +100);
}

function handleMouseDownResize(){
    console.log("Resize function is active!");
    document.onmousemove=myResizeFunction;
}

function addNewBox() {
    let newBox = document.createElement('div');
    newBox.setAttribute('id',(numberOfBoxes).toString());
    newBox.style.cssText = "width: 100px; height:100px; background: blue; position: absolute; border:none;";
    newBox.style.top= '5px';
    newBox.style.left= '5px';

    let newUnderBox = document.createElement('div');
    newUnderBox.setAttribute('id',('u'+numberOfBoxes).toString());
    newUnderBox.style.cssText = "width: 110px; height:110px; background: black; position: absolute; border:none;";
    newUnderBox.setAttribute('onmouseenter','onHoverUnderBox()');
    newUnderBox.setAttribute('onmousedown', 'handleMouseDownResize()');

    let rotateButton = document.createElement('button');
    rotateButton.setAttribute('id',('b'+numberOfBoxes++).toString());
    rotateButton.setAttribute('onmousedown', 'handleMouseDownRotate()');
    rotateButton.style.cssText = "width: 30px; height: 30px; position:absolute; border-radius:50%;";
    rotateButton.style.left= 40  + 'px';
    rotateButton.style.top= 135+ 'px';

    document.getElementById("boxContainer").appendChild(newUnderBox);

    document.getElementById("boxContainer").appendChild(rotateButton);
    newBox.setAttribute('onmousedown', "handleMouseDownBox(this.id)");
    // newBox.setAttribute('onclick', "handleMouseClick(this.id)");
    document.getElementById("boxContainer").appendChild(newBox);
}

function handleMouseDownRotate(){
    console.log("Rotate button is pressed!");
    document.onmousemove = rotate;
}

function wrapperForStylePx(size){
    return (size + 'px');
}

function handleMouseMove(event) {
    xAxis=event.pageX;
    yAxis=event.pageY;
    console.log("Mouse is moving!");
    let myBox=document.getElementById(currentID);
    let x = xAxis +'px';
    let y = yAxis + 'px';
    console.log(x);
    xPoint=xAxis;
    yPoint=yAxis;

    myBox.style.left=wrapperForStylePx(xAxis+5);//x;
    myBox.style.top=wrapperForStylePx(yAxis+5);//y;

    console.log(('b'+currentID).toString());
    let myButton = document.getElementById(('b'+currentID).toString());
    myButton.style.left = (40 + xAxis) + 'px';
    myButton.style.top= (135 + yAxis) + 'px';

    document.getElementById(('u'+currentID).toString()).style.left=x;
    document.getElementById(('u'+currentID).toString()).style.top=y;


}
function handleMouseDownBox(id) {
    console.log("Mouse is Down!");
    currentID = id;

    document.getElementById(('b'+currentID).toString()).style.zIndex=(highestZIndex+ 1).toString();

    document.getElementById(id).style.zIndex=(highestZIndex+=2).toString();
    document.onmousemove = handleMouseMove;
}

// function handleMouseClick(event){
//     xPoint=event.pageX;
//     yPoint=event.pageY;
// }

function handleMouseUp() {
    document.onmousemove = null;
    console.log("Mouse is Up!")
}