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
let cornerResizeTopLeft;
let cornerResizeTopRight;
let cornerResizeBottomRight;
let cornerResizeBottomLeft;
let topResize;
let rightResize;
let bottomResize;
let leftResize;
let boxTop;
let boxLeft;

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
    id=id.slice(12);
    currentID = id;
    updateElements();
    if(myBox.style.transform.slice(-6,-3))
        {startingRotationValue = myBox.style.transform.slice(7,-4)}
    else
        {startingRotationValue=0;}

    document.onmousemove = rotate;
}
function myResizeFunctionTop(event){
    myUnderBox.style.top = wrapperForStylePx(boxTop + (event.pageY - startingMouseY));
    myBox.style.top = wrapperForStylePx(boxTop + (event.pageY - startingMouseY)+5);
    myResizeFunctionGeneral(0,-1,event);
}

function myResizeFunctionRight(event){
    myResizeFunctionGeneral(1,0,event);
}
function myResizeFunctionBottom(event){
    myResizeFunctionGeneral(0,1,event);
}
function myResizeFunctionLeft(event){
    myUnderBox.style.left = wrapperForStylePx(boxLeft + (event.pageX - startingMouseX));
    myBox.style.left = wrapperForStylePx(boxLeft + (event.pageX - startingMouseX)+5);
    myResizeFunctionGeneral(-1,0,event);
}

function reCenterMyButton(){
    myButton.style.left = wrapperForStylePx( Number(myBox.style.left.slice(0,-2)) -15 + Number((myBox.style.width.slice(0,-2)))/2 );
    myButton.style.top= wrapperForStylePx(1.35 * myBox.style.height.slice(0,-2) + Number(myBox.style.top.slice(0,-2)));
}

function myResizeFunctionTopLeft(event) {
    myUnderBox.style.left = wrapperForStylePx(boxLeft + (event.pageX - startingMouseX));
    myUnderBox.style.top = wrapperForStylePx(boxTop + (event.pageY - startingMouseY));

    myBox.style.left = wrapperForStylePx(boxLeft + (event.pageX - startingMouseX)+5);
    myBox.style.top = wrapperForStylePx(boxTop + (event.pageY - startingMouseY)+5);

    myResizeFunctionGeneral(-1,-1,event);
}

function myResizeFunctionBottomRight(event) {
    myResizeFunctionGeneral(1,1,event);
}

function myResizeFunctionTopRight(event) {
    myUnderBox.style.top = wrapperForStylePx(boxTop + (event.pageY - startingMouseY));

    myBox.style.top = wrapperForStylePx(boxTop + (event.pageY - startingMouseY)+5);

    myResizeFunctionGeneral(1,-1,event);
}

function myResizeFunctionBottomLeft(event) {
    myUnderBox.style.left = wrapperForStylePx(boxLeft + (event.pageX - startingMouseX));

    myBox.style.left = wrapperForStylePx(boxLeft + (event.pageX - startingMouseX)+5);

    myResizeFunctionGeneral(-1,1,event);
}

function myResizeFunctionGeneral(x, y,event){
    myBox.style.width = wrapperForStylePx(width + x * (event.pageX - startingMouseX)-10);
    myBox.style.height = wrapperForStylePx(height + y * (event.pageY - startingMouseY)-10);

    myUnderBox.style.width = wrapperForStylePx(width + x * (event.pageX - startingMouseX));
    myUnderBox.style.height = wrapperForStylePx(height + y * (event.pageY - startingMouseY));

    reCenterMyButton();
}

function handleMouseDownResize(event){
    currentID = event.target.id;
    if(currentID.includes('TopRight')){
        currentID = event.target.id.slice(8);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionTopRight;
    }else if(currentID.includes('BottomRight')){
        currentID = event.target.id.slice(11);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionBottomRight;
    }else if(currentID.includes('TopLeft')){
        currentID = event.target.id.slice(7);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionTopLeft;
    }else if(currentID.includes('BottomLeft')){
        currentID = event.target.id.slice(10);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionBottomLeft;
    }else if(currentID.includes('Top')){
        currentID = event.target.id.slice(3);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionTop;
    }else if(currentID.includes('Right')){
        currentID = event.target.id.slice(5);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionRight;
    }else if(currentID.includes('Bottom')){
        currentID = event.target.id.slice(6);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionBottom;
    }else{
        currentID = event.target.id.slice(4);
        findTheRightFunctionAndResize(event);
        document.onmousemove=myResizeFunctionLeft;
    }
}
function findTheRightFunctionAndResize(event){
    updateElements();

    startingMouseX = event.pageX; //where Mouse Starts Dragging From
    startingMouseY = event.pageY; //where Mouse Starts Dragging From

    boxTop =Number(myUnderBox.style.top.slice(0,-2));
    boxLeft =Number(myUnderBox.style.left.slice(0,-2));

    width = Number(myUnderBox.style.width.slice(0,-2));
    height = Number(myUnderBox.style.height.slice(0,-2));
}

function updateElements(){
    myBox = document.getElementById('contentBox'+currentID);
    myButton = document.getElementById('rotateButton'+currentID);
    myUnderBox = document.getElementById('underBox'+currentID);
}

function addNewBox() {
    myBox = document.createElement('div');
    myBox.setAttribute('id','contentBox'+(numberOfBoxes).toString());
    myBox.setAttribute('onmousedown', "handleMouseDownBox(event)");
    myBox.style.cssText = "width: 100px; height:100px; background: blue; position: absolute; border:none;";
    myBox.style.top= '5px';
    myBox.style.left= '5px';

    myUnderBox = document.createElement('div');
    myUnderBox.setAttribute('id',('underBox'+numberOfBoxes).toString());
    myUnderBox.style.cssText = "width: 110px; height:110px; background: black; position: relative; border:none;";

    cornerResizeTopLeft = document.createElement('div');
    cornerResizeTopLeft.setAttribute('id','TopLeft'+numberOfBoxes);
    cornerResizeTopLeft.style.cssText = "width: 20px; height:20px; cursor: nwse-resize; border-radius:50%; background: none; position: absolute; top:-5px; left: -5px; border:none; z-index:1;";

    cornerResizeTopRight = document.createElement('div');
    cornerResizeTopRight.setAttribute('id','TopRight'+numberOfBoxes);
    cornerResizeTopRight.style.cssText = "width: 20px; cursor: nesw-resize; height:20px; border-radius:50%; background: none; position: absolute; top:-5px; right: -5px; border:none; z-index:1;";

    cornerResizeBottomRight = document.createElement('div');
    cornerResizeBottomRight.setAttribute('id','BottomRight'+numberOfBoxes);
    cornerResizeBottomRight.style.cssText = "width: 20px; height:20px; cursor: nwse-resize; border-radius:50%; background: none; position: absolute; bottom:-5px; right: -5px; border:none; z-index:1;";

    cornerResizeBottomLeft = document.createElement('div');
    cornerResizeBottomLeft.setAttribute('id','BottomLeft'+numberOfBoxes);
    cornerResizeBottomLeft.style.cssText = "width: 20px; height:20px; cursor: nesw-resize; border-radius:50%; background: none; position: absolute; bottom:-5px; left: -5px; border:none; z-index:1;";

    topResize = document.createElement('div');
    topResize.setAttribute('id','Top' + numberOfBoxes);
    topResize.style.cssText = "width: 100%; height:10px;cursor: ns-resize; background: red; position: absolute; top:0; border:none;";

    rightResize = document.createElement('div');
    rightResize.setAttribute('id','Right' + numberOfBoxes);
    rightResize.style.cssText = "height: 100%; width:10px; cursor: ew-resize;background: red; position: absolute; right:0; border:none;";

    bottomResize = document.createElement('div');
    bottomResize.setAttribute('id','Bottom' + numberOfBoxes);
    bottomResize.style.cssText = "width: 100%; height:10px;cursor: ns-resize; background: red; position: absolute; bottom:0; border:none;";

    leftResize = document.createElement('div');
    leftResize.setAttribute('id','Left' + numberOfBoxes);
    leftResize.style.cssText = "height: 100%; width:10px;cursor: ew-resize; background: red; position: absolute; left:0; border:none;";

    myUnderBox.appendChild(cornerResizeTopLeft);
    myUnderBox.appendChild(cornerResizeTopRight);
    myUnderBox.appendChild(cornerResizeBottomRight);
    myUnderBox.appendChild(cornerResizeBottomLeft);
    myUnderBox.appendChild(topResize);
    myUnderBox.appendChild(rightResize);
    myUnderBox.appendChild(bottomResize);
    myUnderBox.appendChild(leftResize);

    cornerResizeTopLeft.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    cornerResizeTopRight.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    cornerResizeBottomRight.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    cornerResizeBottomLeft.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    topResize.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    rightResize.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    bottomResize.setAttribute('onmousedown', 'handleMouseDownResize(event)');
    leftResize.setAttribute('onmousedown', 'handleMouseDownResize(event)');



    myButton = document.createElement('button');
    myButton.setAttribute('id',('rotateButton'+numberOfBoxes++).toString());
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
    currentID = event.target.id.slice(10);
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