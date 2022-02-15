import './App.css';

import SlideComponent from './SliderEditor/SlideComponent'
import {SlideObject, SlideTypes} from "./SliderEditor/SlideObjects/SlideStructures";

function App() {
    let addCircle = () => {
        SlideComponent.state.objects.push(new SlideObject(SlideTypes.shapeObject, 1));
    }
    return (
        <div className="App slide_editor">

            <SlideComponent></SlideComponent>
        </div>
    );
}

export default App;
