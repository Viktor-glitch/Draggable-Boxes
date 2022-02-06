document.onmouseup = handleMouseUp;
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
//let myUnderTriangle;
let startingRotationValue;

function rotate(event){
    let delta_x = event.pageX - (Number(myBox.style.left.slice(0,-2)) + Number(myBox.style.width.slice(0,-2))/2);//touch_x - center_x
    let delta_y = (Number(myBox.style.top.slice(0,-2)) + Number(myBox.style.height.slice(0,-2))/2) - event.pageY;//center_y - touch_y;
    let theta_radians = Math.atan2(delta_y, delta_x);

    if (theta_radians < 0)
        theta_radians = Math.abs(theta_radians);
    else
        theta_radians = 2 * Math.PI - theta_radians;

    theta_radians+=Number(startingRotationValue)-1.570796;

    myBox.style.transform = "rotate(" + theta_radians + "rad)";
    myButton.style.transform = "rotate(" + theta_radians + "rad)";
    myUnderBox.style.transform = "rotate(" + theta_radians + "rad)";
}
function handleMouseDownRotate(id){
    id=id.slice(1);
    currentID = id;
    updateElements();
    if(myBox.style.transform.slice(-6,-3))
        {startingRotationValue = myBox.style.transform.slice(7,-4)}
    else
        {startingRotationValue=0;}

    document.onmousemove = rotate;
}

function reCenterMyButton(){
    myButton.style.left = wrapperForStylePx( Number(myBox.style.left.slice(0,-2)) -15 + Number((myBox.style.width.slice(0,-2)))/2 );
    myButton.style.top= wrapperForStylePx(1.35 * myBox.style.height.slice(0,-2) + Number(myBox.style.top.slice(0,-2)));
}

function onHoverUnderBox(){
    myUnderBox.style.cursor= 'nwse-resize';
}

function myResizeFunction(event) {
    myBox.style.width=wrapperForStylePx(width+(event.pageX-startingMouseX) -10);//x;
    myBox.style.height=wrapperForStylePx(height+(event.pageY-startingMouseY) -10);//y;

    myUnderBox.style.width = wrapperForStylePx(width+(event.pageX-startingMouseX));
    myUnderBox.style.height = wrapperForStylePx(height+(event.pageY-startingMouseY));

    reCenterMyButton();
}

function handleMouseDownResize(event){
    currentID = event.target.id.slice(1);
    updateElements();
    startingMouseX = event.pageX; //where Mouse Starts Dragging From
    startingMouseY = event.pageY; //where Mouse Starts Dragging From
    width = Number(myBox.style.width.slice(0,-2));
    height = Number(myBox.style.height.slice(0,-2));
    document.onmousemove=myResizeFunction;
}

function updateElements(){
    myBox = document.getElementById(currentID);
    myButton = document.getElementById('b'+currentID);
    myUnderBox = document.getElementById('u'+currentID);
}

function addNewBox() {
    myBox = document.createElement('div');
    myBox.setAttribute('id',(numberOfBoxes).toString());
    myBox.setAttribute('onmousedown', "handleMouseDownBox(event)");
    myBox.style.cssText = "width: 100px; height:100px; background: blue; position: absolute; border:none;";
    myBox.style.top= '5px';
    myBox.style.left= '5px';

    myUnderBox = document.createElement('div');
    myUnderBox.setAttribute('id',('u'+numberOfBoxes).toString());
    myUnderBox.style.cssText = "width: 110px; height:110px; background: black; position: absolute; border:none; overflow:hidden";
    myUnderBox.setAttribute('onmouseenter','onHoverUnderBox()');
    myUnderBox.setAttribute('onmousedown', 'handleMouseDownResize(event)');

    // myUnderTriangle = document.createElement('div');
    // myUnderTriangle.setAttribute('id',('t'+numberOfBoxes).toString());
    // myUnderTriangle.style.cssText = "background: black; position: absolute; border:none;";
    // myUnderTriangle.style.width = '200px';
    // myUnderTriangle.style.height = '200px';
    // myUnderTriangle.style.transform = 'rotate(45deg) translate(-86%,0)';
    //
    // myUnderBox.appendChild(myUnderTriangle);

    myButton = document.createElement('button');
    myButton.setAttribute('id',('b'+numberOfBoxes++).toString());
    myButton.setAttribute('onmousedown', 'handleMouseDownRotate(this.id)');
    myButton.style.cssText = "width: 30px; height: 30px; position:absolute; border-radius:50%;";
    myButton.style.left= wrapperForStylePx(40);
    myButton.style.top= wrapperForStylePx(135);

    let boxContainer = document.getElementById("boxContainer");
    boxContainer.appendChild(myUnderBox);
    boxContainer.appendChild(myButton);
    boxContainer.appendChild(myBox);
}

function wrapperForStylePx(size){
    return (size + 'px');
}

function handleMouseMove(event) {
    myBox.style.left=wrapperForStylePx(event.pageX-startingMouseInsideX+5);//x;
    myBox.style.top=wrapperForStylePx(event.pageY-startingMouseInsideY+5);//y;

    reCenterMyButton();

    myUnderBox.style.left=wrapperForStylePx(event.pageX-startingMouseInsideX);
    myUnderBox.style.top=wrapperForStylePx(event.pageY-startingMouseInsideY);
}

function handleMouseDownBox(event) {
    currentID = event.target.id;
    updateElements();

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