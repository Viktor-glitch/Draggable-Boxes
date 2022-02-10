document.onmouseup = handleMouseUp;

let highestZIndex = 0;
let currentID = '0';
let numberOfBoxes = 0;
let startingMouseX = 0;
let startingMouseY =0;
let myButton;
let myUnderBox;
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
let colorPickerBackground;
let colorPickerBorder;
let colorPickerBackgroundEnable = false;
let colorPickerBorderEnable = false;
let initRotate = 0 ;

function isChildOf(child, parent) {
    if (child.parentNode === parent) {
        return true;
    } else if (child.parentNode === null) {
        return false;
    } else {
        return isChildOf(child.parentNode, parent);
    }
}
function handleOnClickDeselect(){
    if(!isChildOf(event.target,document.getElementById('boxContainer'))) {
        document.getElementById('Edit').style.display = 'none';
        colorPickerBackgroundEnable = false;
        colorPickerBorderEnable = false;
    }
}

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
        rotateBox((angle + initRotate) * 180 / Math.PI);
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
    myButton.style.left = wrapperForStylePx(Number(boxWrapper.style.left.slice(0,-2)) + Number((boxWrapper.style.width.slice(0,-2)))/2 - 100);
    myButton.style.top= wrapperForStylePx(Number(boxWrapper.style.height.slice(0,-2))/2 + Number(boxWrapper.style.top.slice(0,-2))+30);
    myMoveButton.style.left = wrapperForStylePx(Number(boxWrapper.style.left.slice(0,-2)) + Number((boxWrapper.style.width.slice(0,-2)))/2 - 60);
    myMoveButton.style.top= wrapperForStylePx(Number(boxWrapper.style.height.slice(0,-2))/2 + Number(boxWrapper.style.top.slice(0,-2))+30);
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

    initRotate = getCurrentRotation(boxWrapper);
    var initRadians = initRotate * Math.PI / 180;
    console.log(initRotate);
    var cosFraction = Math.cos(initRadians);
    var sinFraction = Math.sin(initRadians);
    function eventMoveHandler(event) {
        var wDiff = (event.clientX - mousePressX);
        var hDiff = (event.clientY - mousePressY);

        // if(xResize&&yResize){
        //     if(Math.abs(wDiff)>Math.abs(hDiff)){
        //         wDiff = hDiff;
        //     }else{
        //         hDiff=wDiff;
        //     }
        // }

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
        // document.getElementById('tria'+currentID).setAttribute('points','0,' + newH + ' ' + newW + ',' + newH + ' ' + newW/2 +',0');
        repositionElement(newX, newY);
        reCenterMyButton();
    }

    window.addEventListener('mousemove', eventMoveHandler, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function updateElements(){
    boxWrapper = document.getElementById('BoxWrapper'+ currentID);
    myMoveButton = document.getElementById('MoveButton'+currentID);
    myButton = document.getElementById('rotateButton'+currentID);
    myUnderBox = document.getElementById('underBox'+currentID);
    getValueBackgroundColor();
    getValueBorderStyle();
    getValueBorderColor();
    initRotate = getCurrentRotation(boxWrapper);
}
function getValueBorderStyle(){
    document.getElementById('text').value=myUnderBox.style.borderStyle;
}
function getValueBackgroundColor() {
    if(myUnderBox.style.backgroundColor==='none'){
        document.getElementById('backgroundColor').value = '#FFFFFF';
    } else {
        document.getElementById('backgroundColor').value = myUnderBox.style.backgroundColor;
    }

}
function getValueBorderColor(){
    if(myUnderBox.style.backgroundColor==='none'){
        document.getElementById('borderColor').value = '#FFFFFF';
    } else {
        document.getElementById('borderColor').value = myUnderBox.style.borderColor;
    }
}

function addNewBox(shape) {

    boxWrapper = document.createElement('div');
    boxWrapper.setAttribute('id','BoxWrapper'+(numberOfBoxes).toString());
    boxWrapper.style.cssText = "width: 110px; height:110px; left: 100px; top:100px;position: absolute; transform-origin: top left;";

    myMoveButton = document.createElement('button');
    myMoveButton.setAttribute('id','MoveButton'+(numberOfBoxes).toString());
    myMoveButton.setAttribute('onmousedown', "handleMouseDownButton(event)");
    myMoveButton.style.cssText = "width: 30px; height: 30px; cursor:move; position:absolute; border-radius:50%;";
    myMoveButton.style.left= wrapperForStylePx(70);
    myMoveButton.style.top= wrapperForStylePx(135);

    myUnderBox = document.createElement('div');
    myUnderBox.setAttribute('id',('underBox'+numberOfBoxes).toString());
    myUnderBox.style.cssText = "width: 110px; height:110px; background: none; position: relative; border:solid; border-color:black; border-width:1px;transform: translate(-50%, -50%);";
    myUnderBox.setAttribute('onclick', 'handleUnderBoxDownButton(event)');

    myButton = document.createElement('button');
    myButton.setAttribute('id',('rotateButton'+numberOfBoxes).toString());
    myButton.setAttribute('onmousedown', 'handleMouseDownRotate(this.id)');
    myButton.style.cssText = "width: 30px; height: 30px; position:absolute; border-radius:50%;";
    myButton.style.left= wrapperForStylePx(20);
    myButton.style.top= wrapperForStylePx(135);

    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('class', 'svg');
    svg.style.cssText = 'width:100%; height:100%; viewBox= " 0 0 100 100"';

    if(shape == 0) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttribute('id', 'rect'+currentID);
        rect.setAttribute("x", "0");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", "#000000");
        svg.appendChild(rect);
        myUnderBox.appendChild(svg);
    }else if(shape == 1){
        var triangle = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        triangle.setAttribute('points','0,110 110,110 55,0');
        triangle.style.cssText='fill:#000000';
        triangle.setAttribute('id', 'tria'+currentID);
        svg.appendChild(triangle);
        myUnderBox.appendChild(svg);
    } else if(shape ==2){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.style.cssText='width:100%; height:100% fill:#000000';
        circle.setAttribute('cx','50%');
        circle.setAttribute('cy','50%');
        circle.setAttribute('r','50%');
        circle.setAttribute('id', 'circ'+currentID);
        svg.appendChild(circle);
        myUnderBox.appendChild(svg);
    }else if(shape == 3){
        var image = document.createElement('img');
        image.setAttribute('id', 'imag'+currentID);
        image.src = 'data:image/jpeg;base64,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';
        myUnderBox.appendChild(image);
         if(image.naturalWidth!=0){
            console.log('Took it from natural');
            myUnderBox.style.width = wrapperForStylePx(image.naturalWidth);
            myUnderBox.style.height = wrapperForStylePx(image.naturalHeight);
        } else if(image.clientWidth!=0){
            console.log('Took it from client');
            myUnderBox.style.width = wrapperForStylePx(image.clientWidth);
            myUnderBox.style.height = wrapperForStylePx(image.clientHeight);
        } else if(image.width!=0) {
            console.log('Took it from image');
            myUnderBox.style.width = wrapperForStylePx(image.width);
            myUnderBox.style.height = wrapperForStylePx(image.height);
        }
        function CreateDelegate(contextObject, delegateMethod)
        {
            return function()
            {
                return delegateMethod.apply(contextObject, arguments);
            }
        }

        function imgTesting_onload()
        {
            alert(this.width + " by " + this.height);
            myUnderBox.style.width = wrapperForStylePx(this.width);
            myUnderBox.style.height = wrapperForStylePx(this.height);
            image.style.cssText = 'width: 100%; height:100%;';
        }

        image.onload = CreateDelegate(image, imgTesting_onload);
        image.style.cssText = 'width: 100%; height:100%;';
    } else if(shape == 4){

        var text = document.createElement('div');
        text.style.cssText = 'width: 100%; height:100%;';
        text.setAttribute('contenteditable', 'true');
        myUnderBox.appendChild(text);
    }

    function f1() {
        //function to make the text bold using DOM method
        document.getElementById("textarea1").style.fontWeight = "bold";
    }

    function f2() {
        //function to make the text italic using DOM method
        document.getElementById("textarea1").style.fontStyle = "italic";
    }

    function f3() {
        //function to make the text alignment left using DOM method
        document.getElementById("textarea1").style.textAlign = "left";
    }

    function f4() {
        //function to make the text alignment center using DOM method
        document.getElementById("textarea1").style.textAlign = "center";
    }

    function f5() {
        //function to make the text alignment right using DOM method
        document.getElementById("textarea1").style.textAlign = "right";
    }

    function f6() {
        //function to make the text in Uppercase using DOM method
        document.getElementById("textarea1").style.textTransform = "uppercase";
    }

    function f7() {
        //function to make the text in Lowercase using DOM method
        document.getElementById("textarea1").style.textTransform = "lowercase";
    }

    function f8() {
        //function to make the text capitalize using DOM method
        document.getElementById("textarea1").style.textTransform = "capitalize";
    }

    function f9() {
        //function to make the text back to normal by removing all the methods applied
        //using DOM method
        document.getElementById("textarea1").style.fontWeight = "normal";
        document.getElementById("textarea1").style.textAlign = "left";
        document.getElementById("textarea1").style.fontStyle = "normal";
        document.getElementById("textarea1").style.textTransform = "capitalize";
        document.getElementById("textarea1").value = " ";
    }

    console.log(myUnderBox.style.width);
    reCenterMyButton();

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
    rightResize.style.cssText = "display: flex; aalign-content: center; justify-content:center; height: 100%; width:20px; cursor: ew-resize; top:0; position: absolute; right:-10px; border:none;";

    bottomResize = document.createElement('div');
    bottomResize.setAttribute('id','Bottom' + numberOfBoxes);
    bottomResize.style.cssText = "display: flex; align-content: center; justify-content:center; width: 100%; height:20px;cursor: ns-resize;  position: absolute; bottom:-10px; border:none;";

    leftResize = document.createElement('div');
    leftResize.setAttribute('id','Left' + numberOfBoxes++);
    leftResize.style.cssText = "display: flex; align-content: center; justify-content:center; height: 100%; width:20px;cursor: ew-resize;  position: absolute; top:0; left:-10px; border:none;";

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

    colorPickerBackground = document.getElementById('backgroundColor');
    colorPickerBorder = document.getElementById('borderColor');

    getValueBackgroundColor();
    getValueBorderStyle();
    getValueBorderColor();
}

setInterval(() => {
    if(colorPickerBackgroundEnable) {
        if (document.getElementById('Edit').style.display == 'block') {
            myUnderBox.style.backgroundColor = colorPickerBackground.value;
        }
    }
}, 200);

setInterval(() => {
    if(colorPickerBorderEnable) {
        if (document.getElementById('Edit').style.display == 'block') {
            myUnderBox.style.borderColor = colorPickerBorder.value;
        }
    }
}, 200);

function enableBackgroundPicker (){
    colorPickerBackgroundEnable = true;
}

function enableBorderPicker (){
    colorPickerBorderEnable = true;
}

function wrapperForStylePx(size){
    return (size + 'px');
}

function onHoverBox(){
    myUnderBox.style.border = 'border-size: 3px; border:solid; border-color:black;'
}

function addSquare(){
    addNewBox(0);
}
function addCircle() {
    addNewBox(2);
}
function addTriangle(){
    addNewBox(1);
}
function addImg(){
    addNewBox(3);
}
function addText(){
    addNewBox(4);
}
function handleMouseMove(event) {
    boxWrapper.style.left=wrapperForStylePx(startingMouseInsideX+event.pageX-startingMouseX);
    boxWrapper.style.top=wrapperForStylePx(startingMouseInsideY+event.pageY-startingMouseY);

    reCenterMyButton();
}
function handleUnderBoxDownButton(event){
    if(currentID.includes('UnderBox'))
        currentID = event.target.id.slice(8);
    getValueBackgroundColor();
    updateElements();

    boxWrapper.style.zIndex=(highestZIndex + 1).toString();
    myButton.style.zIndex=(highestZIndex + 1).toString();
    myUnderBox.style.zIndex=(highestZIndex + 1).toString();
    myMoveButton.style.zIndex=(highestZIndex+=1).toString();

    document.getElementById('Edit').style.display = 'block';
}
function handleMouseDownButton(event) {
    currentID = event.target.id.slice(10);
    getValueBackgroundColor();
    updateElements();

    startingMouseX = event.pageX; //where Mouse Starts Dragging From
    startingMouseY = event.pageY; //where Mouse Starts Dragging From
    startingMouseInsideX = Number(boxWrapper.style.left.slice(0,-2));
    startingMouseInsideY = Number(boxWrapper.style.top.slice(0,-2));

    boxWrapper.style.zIndex=(highestZIndex + 1).toString();
    myButton.style.zIndex=(highestZIndex + 1).toString();
    myUnderBox.style.zIndex=(highestZIndex + 1).toString();
    myMoveButton.style.zIndex=(highestZIndex+=1).toString();

    document.onmousemove = handleMouseMove;
}

function handleMouseUp() {
    document.onmousemove = null;
}