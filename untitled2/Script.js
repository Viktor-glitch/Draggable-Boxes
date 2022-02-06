

document.onmouseup = handleMouseUp;
let xAxis = 5;
let yAxis = 5;
let highestZIndex = 0;
let currentID = '0';
let numberOfBoxes = 0;
let startingMouseX = 0;
let startingMouseY =0;
let myBox;
let myButton;
let myUnderBox;
let width;
let height;
let startingMouseInsideX;
let startingMouseInsideY;
let myUnderTriangle;

function rotate(event){
    let delta_x = event.pageX - (Number(myBox.style.left.slice(0,-2)) + Number(myBox.style.width.slice(0,-2))/2);//touch_x - center_x
    let delta_y = (Number(myBox.style.top.slice(0,-2)) + Number(myBox.style.height.slice(0,-2))/2) - event.pageY;//center_y - touch_y;
    let theta_radians = Math.atan2(delta_y, delta_x);

    if (theta_radians < 0)
        theta_radians = Math.abs(theta_radians);
    else
        theta_radians = 2 * Math.PI - theta_radians;

    theta_radians-=1.570796;

    myBox.style.transform = "rotate(" + theta_radians + "rad)";
    myButton.style.transform = "rotate(" + theta_radians + "rad)";
    myUnderBox.style.transform = "rotate(" + theta_radians + "rad)";
}

function reCenterMyButton(){
    myButton.style.left = wrapperForStylePx( Number(myBox.style.left.slice(0,-2)) -15 + Number((myBox.style.width.slice(0,-2)))/2 );
    myButton.style.top= wrapperForStylePx(1.35 * myBox.style.height.slice(0,-2) + Number(myBox.style.top.slice(0,-2)));
}

function onHoverUnderBox(){
    myUnderBox.style.cursor= 'nwse-resize';
}

function myResizeFunction(event) {
    xAxis=event.pageX;
    yAxis=event.pageY;

    console.log(Number(myBox.style.width.slice(0,-2)));
    myBox.style.width=wrapperForStylePx(width+(xAxis-startingMouseX) -10);//x;
    myBox.style.height=wrapperForStylePx(height+(yAxis-startingMouseY) -10);//y;

    myUnderBox.style.width = wrapperForStylePx(width+(xAxis-startingMouseX));
    myUnderBox.style.height = wrapperForStylePx(height+(yAxis-startingMouseY));

    reCenterMyButton();
}

function handleMouseDownResize(event){
    startingMouseX = event.pageX; //where Mouse Starts Dragging From
    startingMouseY = event.pageY; //where Mouse Starts Dragging From
    width = Number(myBox.style.width.slice(0,-2));
    height = Number(myBox.style.height.slice(0,-2));
    document.onmousemove=myResizeFunction;
}

function addNewBox() {
    myBox = document.createElement('div');
    myBox.setAttribute('id',(numberOfBoxes).toString());
    myBox.setAttribute('onmousedown', "handleMouseDownBox(event)");
    myBox.style.cssText = "width: 100px; height:100px; background: blue; position: absolute; border:none; border-radius:50%";
    myBox.style.top= '5px';
    myBox.style.left= '5px';

    myUnderBox = document.createElement('div');
    myUnderBox.setAttribute('id',('u'+numberOfBoxes).toString());
    myUnderBox.style.cssText = "width: 110px; height:110px; background: none; position: absolute; border:none; overflow:hidden";
    myUnderBox.setAttribute('onmouseenter','onHoverUnderBox()');
    myUnderBox.setAttribute('onmousedown', 'handleMouseDownResize(event)');

    myUnderTriangle = document.createElement('div');
    myUnderTriangle.setAttribute('id',('t'+numberOfBoxes).toString());
    myUnderTriangle.style.cssText = "background: black; position: absolute; border:none;";
    myUnderTriangle.style.width = '200px';
    myUnderTriangle.style.height = '200px';
    myUnderTriangle.style.transform = 'rotate(45deg) translate(-86%,0)';

    myUnderBox.appendChild(myUnderTriangle);

    myButton = document.createElement('button');
    myButton.setAttribute('id',('b'+numberOfBoxes++).toString());
    myButton.setAttribute('onmousedown', 'handleMouseDownRotate(this.id)');
    myButton.style.cssText = "width: 30px; height: 30px; position:absolute; border-radius:50%;";
    myButton.style.left= 40  + 'px';
    myButton.style.top= 135+ 'px';

    let boxContainer = document.getElementById("boxContainer");
    boxContainer.appendChild(myUnderBox);
    boxContainer.appendChild(myButton);
    boxContainer.appendChild(myBox);
}

function handleMouseDownRotate(id){
    id=id.slice(1);
    currentID = id;
    myBox = document.getElementById(id);
    myButton = document.getElementById('b'+id);
    myUnderBox = document.getElementById('u'+id);
    document.onmousemove = rotate;
}

function wrapperForStylePx(size){
    return (size + 'px');
}

function handleMouseMove(event) {
    xAxis=event.pageX;
    yAxis=event.pageY;

    myBox.style.left=wrapperForStylePx(xAxis-startingMouseInsideX+5);//x;
    myBox.style.top=wrapperForStylePx(yAxis-startingMouseInsideY+5);//y;

    reCenterMyButton();

    myUnderBox.style.left=wrapperForStylePx(xAxis-startingMouseInsideX);
    myUnderBox.style.top=wrapperForStylePx(yAxis-startingMouseInsideY);
}

function handleMouseDownBox(event) {
    currentID = event.target.id;
    console.log(currentID)
    myBox = document.getElementById(currentID);
    myButton = document.getElementById('b'+currentID);
    myUnderBox = document.getElementById('u'+currentID);

    startingMouseX = event.pageX; //where Mouse Starts Dragging From
    startingMouseY = event.pageY; //where Mouse Starts Dragging From
    startingMouseInsideX = Number(startingMouseX-Number(myBox.style.left.slice(0,-2)));
    startingMouseInsideY = Number(startingMouseY-Number(myBox.style.top.slice(0,-2)));

    myButton.style.zIndex=(highestZIndex + 1).toString();
    myUnderBox.style.zIndex=(highestZIndex + 1).toString();
    myBox.style.zIndex=(highestZIndex+=2).toString();

    document.onmousemove = handleMouseMove;
}

function handleMouseUp() {
    document.onmousemove = null;
}