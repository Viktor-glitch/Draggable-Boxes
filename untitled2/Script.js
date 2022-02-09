document.onmouseup = handleMouseUp;
let highestZIndex = 0;
let currentID = '0';
let numberOfBoxes = 0;
let startingMouseX = 0;
let startingMouseY =0;
let myBox;
let myButton;
let myUnderBox;
let initialWidth;
let initialHeight;
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
let boxWrapperTop;
let boxWrapperLeft;
let boxWrapper;
let initialRotate;
const minHeight = 40;
const minWidth = 40;
let initX;
let initY;
let mousePressX;
let mousePressY;
let myMoveButton;

function getCurrentRotation(el) {
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform")
    "none";
    if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI));
        return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
}

function resize(w, h) {
    myUnderBox.style.width = w + 'px';
    myUnderBox.style.height = h + 'px';
    boxWrapper.style.width = w + 'px';
    boxWrapper.style.height = h + 'px';
}
function repositionElement(x, y) {
    boxWrapper.style.left = x + 'px';
    boxWrapper.style.top = y + 'px';
}

function rotate(event){
    // let delta_x = event.pageX - Number(boxWrapper.style.left.slice(0,-2));//touch_x - center_x
    // let delta_y = Number(boxWrapper.style.top.slice(0,-2)) - event.pageY;//center_y - touch_y;
    // let theta_radians = Math.atan2(delta_y, delta_x);
    //
    // if (theta_radians < 0)
    //     theta_radians = Math.abs(theta_radians);
    // else
    //     theta_radians = 2 * Math.PI - theta_radians;
    //
    // theta_radians+=Number(startingRotationValue)-1.570796;


        initX = this.offsetLeft;
        initY = this.offsetTop;
        mousePressX = event.clientX;
        mousePressY = event.clientY;


        var arrow = myUnderBox;
        var arrowRects = arrow.getBoundingClientRect();
        var arrowX = arrowRects.left + arrowRects.width / 2;
        var arrowY = arrowRects.top + arrowRects.height / 2;

        function eventMoveHandler(event) {
            var angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
            rotateBox(angle * 180 / Math.PI);
        }

        window.addEventListener('mousemove', eventMoveHandler, false);

        window.addEventListener('mouseup', function eventEndHandler() {
            window.removeEventListener('mousemove', eventMoveHandler, false);
            window.removeEventListener('mouseup', eventEndHandler);
        }, false);


    // myButton.style.transform = "rotate(" + theta_radians + "rad)";
    // myUnderBox.style.transform = "rotate(" + theta_radians + "rad)";
}
function handleMouseDownRotate(id){
    id=id.slice(12);
    currentID = id;
    updateElements();
    document.onmousemove = rotate;
}

function reCenterMyButton(){
    myButton.style.left = wrapperForStylePx( Number(myUnderBox.style.left.slice(0,-2)) -15 + Number((myUnderBox.style.width.slice(0,-2)))/2 );
    myButton.style.top= wrapperForStylePx(1.35 * myUnderBox.style.height.slice(0,-2) + Number(myUnderBox.style.top.slice(0,-2)));
}

function handleMouseDownResize(event, left = false, top = false, xResize = false, yResize = false){
    currentID = event.target.id;
    if(currentID.includes('TopRight')){
        currentID = event.target.id.slice(8);
    }else if(currentID.includes('BottomRight')){
        currentID = event.target.id.slice(11);
    }else if(currentID.includes('TopLeft')){
        currentID = event.target.id.slice(7);
    }else if(currentID.includes('BottomLeft')){
        currentID = event.target.id.slice(10);
    }else if(currentID.includes('Top')){
        currentID = event.target.id.slice(3);
    }else if(currentID.includes('Right')){
        currentID = event.target.id.slice(5);
    }else if(currentID.includes('Bottom')){
        currentID = event.target.id.slice(6);
    }else{
        currentID = event.target.id.slice(4);
    }
    updateElements();
    findTheRightFunctionAndResize(event, left, top, xResize, yResize);
}

function rotateBox(deg) {
    boxWrapper.style.transform = `rotate(${deg}deg)`;
}

function findTheRightFunctionAndResize(event, left = false, top = false, xResize = false, yResize = false){
     initX = boxWrapper.offsetLeft;
     initY = boxWrapper.offsetTop;
     mousePressX = event.clientX;
    mousePressY = event.clientY;

    let initW = myUnderBox.offsetWidth;
    let initH = myUnderBox.offsetHeight;

    let initRotate = getCurrentRotation(boxWrapper);
    var initRadians = initRotate * Math.PI / 180;
    var cosFraction = Math.cos(initRadians);
    var sinFraction = Math.sin(initRadians);
    function eventMoveHandler(event) {
        var wDiff = (event.clientX - mousePressX);
        var hDiff = (event.clientY - mousePressY);
        var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
        var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

        var newW = initW, newH = initH, newX = initX, newY = initY;

        if (xResize) {
            if (left) {
                newW = initW - rotatedWDiff;
                if (newW < minWidth) {
                    newW = minWidth;
                    rotatedWDiff = initW - minWidth;
                }
            } else {
                newW = initW + rotatedWDiff;
                if (newW < minWidth) {
                    newW = minWidth;
                    rotatedWDiff = minWidth - initW;
                }
            }
            newX += 0.5 * rotatedWDiff * cosFraction;
            newY += 0.5 * rotatedWDiff * sinFraction;
        }

        if (yResize) {
            if (top) {
                newH = initH - rotatedHDiff;
                if (newH < minHeight) {
                    newH = minHeight;
                    rotatedHDiff = initH - minHeight;
                }
            } else {
                newH = initH + rotatedHDiff;
                if (newH < minHeight) {
                    newH = minHeight;
                    rotatedHDiff = minHeight - initH;
                }
            }
            newX -= 0.5 * rotatedHDiff * sinFraction;
            newY += 0.5 * rotatedHDiff * cosFraction;
        }

        resize(newW, newH);
        repositionElement(newX, newY);
    }

    window.addEventListener('mousemove', eventMoveHandler, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}

function updateElements(){
    console.log("I updated the elements!");
    boxWrapper = document.getElementById('BoxWrapper'+ currentID);
    myMoveButton = document.getElementById('MoveButton'+currentID);
    myButton = document.getElementById('rotateButton'+currentID);
    myUnderBox = document.getElementById('underBox'+currentID);
}

function addNewBox() {
    boxWrapper = document.createElement('div');
    boxWrapper.setAttribute('id','BoxWrapper'+(numberOfBoxes).toString());
    boxWrapper.style.cssText = "width: 110px; height:110px; left: 100px; top:100px;position: absolute; transform-origin: top left;";

    myMoveButton = document.createElement('div');
    myMoveButton.setAttribute('id','MoveButton'+(numberOfBoxes).toString());
    myMoveButton.setAttribute('onmousedown', "handleMouseDownButton(event)");
    myMoveButton.style.cssText = "width: 30px; height: 30px; position:absolute; border-radius:50%;";
    myMoveButton.style.left= wrapperForStylePx(70);
    myMoveButton.style.top= wrapperForStylePx(135);

    myUnderBox = document.createElement('div');
    myUnderBox.setAttribute('id',('underBox'+numberOfBoxes).toString());
    myUnderBox.style.cssText = "width: 110px; height:110px; background: none; position: relative; border:solid; border-color:black; border-width:1px;transform: translate(-50%, -50%);";

    myButton = document.createElement('button');
    myButton.setAttribute('id',('rotateButton'+numberOfBoxes).toString());
    myButton.setAttribute('onmousedown', 'handleMouseDownRotate(this.id)');
    myButton.style.cssText = "width: 30px; height: 30px; position:absolute; border-radius:50%;";
    myButton.style.left= wrapperForStylePx(20);
    myButton.style.top= wrapperForStylePx(135);

    let table = document.createElement('table');
    let row1 = document.createElement('tr');
    let row2 = document.createElement('tr');
    let row3 = document.createElement('tr');
    let 

    cornerResizeTopLeft = document.createElement('div');
    cornerResizeTopLeft.setAttribute('id','TopLeft'+numberOfBoxes);
    cornerResizeTopLeft.style.cssText = "width: 20px; height:20px; cursor: nwse-resize; background-color:white;" +
        "border-radius:50%;  position: absolute; top:-10px; left: -10px; border:solid;  border-width:1px; z-index:1;";

    cornerResizeTopRight = document.createElement('div');
    cornerResizeTopRight.setAttribute('id','TopRight'+numberOfBoxes);
    cornerResizeTopRight.style.cssText = "width: 20px; cursor: nesw-resize; height:20px;background-color:white; border-radius:50%;  position: absolute; top:-10px; right: -10px; border:solid; border-color:black; border-width:1px; z-index:1;";

    cornerResizeBottomRight = document.createElement('div');
    cornerResizeBottomRight.setAttribute('id','BottomRight'+numberOfBoxes);
    cornerResizeBottomRight.style.cssText = "width: 20px; height:20px; cursor: nwse-resize;background-color:white; border-radius:50%; position: absolute; bottom:-10px; right: -10px; border:solid; border-color:black; border-width:1px; z-index:1;";

    cornerResizeBottomLeft = document.createElement('div');
    cornerResizeBottomLeft.setAttribute('id','BottomLeft'+numberOfBoxes);
    cornerResizeBottomLeft.style.cssText = "width: 20px; height:20px; cursor: nesw-resize; background-color:white;border-radius:50%;  position: absolute; bottom:-10px; left: -10px; border:solid; border-color:black; border-width:1px; z-index:1;";

    topResize = document.createElement('div');
    topResize.setAttribute('id','Top' + numberOfBoxes);
    topResize.style.cssText = "display: flex; align-content: center; justify-content:center; width: 100%; height:20px;cursor: ns-resize; position: absolute; top:-10px; border:none;";

    rightResize = document.createElement('div');
    rightResize.setAttribute('id','Right' + numberOfBoxes);
    rightResize.style.cssText = "display: flex; aalign-content: center; justify-content:center; height: 100%; width:20px; cursor: ew-resize; position: absolute; right:-10px; border:none;";

    bottomResize = document.createElement('div');
    bottomResize.setAttribute('id','Bottom' + numberOfBoxes);
    bottomResize.style.cssText = "display: flex; align-content: center; justify-content:center; width: 100%; height:20px;cursor: ns-resize;  position: absolute; bottom:-10px; border:none;";

    leftResize = document.createElement('div');
    leftResize.setAttribute('id','Left' + numberOfBoxes++);
    leftResize.style.cssText = "display: flex; align-content: center; justify-content:center; height: 100%; width:20px;cursor: ew-resize;  position: absolute; left:-10px; border:none;";

    boxWrapper.appendChild(myUnderBox);
    myUnderBox.appendChild(cornerResizeTopLeft);
    myUnderBox.appendChild(cornerResizeTopRight);
    myUnderBox.appendChild(cornerResizeBottomRight);
    myUnderBox.appendChild(cornerResizeBottomLeft);
    myUnderBox.appendChild(topResize);
    myUnderBox.appendChild(rightResize);
    myUnderBox.appendChild(bottomResize);
    myUnderBox.appendChild(leftResize);

    let resizeButtonLandscape = document.createElement('div');
    resizeButtonLandscape.style.cssText = "width: 30px; height: 10px; border-radius:4px; border:solid; border-color:black; border-width:1px;";
    let resizeButtonPortrait = document.createElement('div');
    resizeButtonPortrait.style.cssText = "width: 10px; height: 30px; border-radius:4px; border:solid; border-color:black; border-width:1px;";

    cornerResizeTopLeft.setAttribute('onmousedown', ' handleMouseDownResize(event, true, true, true, true)');
    cornerResizeTopRight.setAttribute('onmousedown',  'handleMouseDownResize(event, false, true, true, true)');
    cornerResizeBottomRight.setAttribute('onmousedown',  'handleMouseDownResize(event, false, false, true, true)');
    cornerResizeBottomLeft.setAttribute('onmousedown',  'handleMouseDownResize(event,true, false, true, true)');
    topResize.setAttribute('onmousedown',  'handleMouseDownResize(event, false, true, false, true)');
    rightResize.setAttribute('onmousedown',  'handleMouseDownResize(event, false, false, true, false)');
    bottomResize.setAttribute('onmousedown', 'handleMouseDownResize(event, false, false, false, true)');
    leftResize.setAttribute('onmousedown',  'handleMouseDownResize(event, true, false, true, false)');

    let boxContainer = document.getElementById("boxContainer");
    boxContainer.appendChild(boxWrapper);
    boxContainer.appendChild(myButton);
    boxContainer.appendChild(myMoveButton);
}

function wrapperForStylePx(size){
    return (size + 'px');
}

function onHoverBox(){
    myUnderBox.style.border = 'border-size: 3px; border:solid; border-color:black;'
}

function handleMouseMove(event) {
    boxWrapper.style.left=wrapperForStylePx(event.pageX-startingMouseInsideX);
    boxWrapper.style.top=wrapperForStylePx(event.pageY-startingMouseInsideY);


    reCenterMyButton();

    // myUnderBox.style.left=wrapperForStylePx(event.pageX-startingMouseInsideX);
    // myUnderBox.style.top=wrapperForStylePx(event.pageY-startingMouseInsideY);
}

function handleMouseDownButton(event) {
    currentID = event.target.id.slice(10);
    updateElements();

    startingMouseX = event.pageX; //where Mouse Starts Dragging From
    startingMouseY = event.pageY; //where Mouse Starts Dragging From
    startingMouseInsideX = Number(startingMouseX-Number(myMoveButton.style.left.slice(0,-2)));
    startingMouseInsideY = Number(startingMouseY-Number(myMoveButton.style.top.slice(0,-2)));

    boxWrapper.style.zIndex=(highestZIndex + 1).toString();
    myButton.style.zIndex=(highestZIndex + 1).toString();
    myUnderBox.style.zIndex=(highestZIndex + 1).toString();
    myMoveButton.style.zIndex=(highestZIndex+=1).toString();

    document.onmousemove = handleMouseMove;
}

function handleMouseUp() {
    document.onmousemove = null;
}