import React, {useEffect, useState, useContext, useRef} from 'react';
import './ObjectControl.scss'
import {AppContext} from "../../../context/AppContext";

const ObjectControl = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});

    useEffect(() => {
    }, []);


    const onResizeHandler = (x,y,z) =>{
        const activeObject = contextData.state.objects[contextData.state.activeObject]
        const activeObjectSize = JSON.parse(JSON.stringify(activeObject.scale))
        const NewActiveObjectSize = {x:activeObjectSize.x + x,y:activeObjectSize.y + y,z:activeObjectSize.z + z  }
        activeObject.scale = NewActiveObjectSize;
        const updatedItems = [...contextData.state.objects.slice(0, contextData.state.activeObject), activeObject, ...contextData.state.objects.slice(contextData.state.activeObject + 1)]
        contextData.dispatchState({
            ...contextData.state,
            objects: updatedItems
        })
    }


    const onRotateHandler = (type,value) =>{
        const activeObject = contextData.state.objects[contextData.state.activeObject]
        activeObject.rotate[type] = activeObject.rotate[type] + value
        const updatedItems = [...contextData.state.objects.slice(0, contextData.state.activeObject), activeObject, ...contextData.state.objects.slice(contextData.state.activeObject + 1)]
        contextData.dispatchState({
            ...contextData.state,
            objects: updatedItems
        })
    }


    const onRePositionHandler = (x,y,z) =>{
        const currentObject = contextData.state.objects[contextData.state.activeObject]
        const activeObjectPosition = currentObject.position
        const NewActiveObjectPosition = {x:activeObjectPosition.x + x,y:activeObjectPosition.y + y,z:activeObjectPosition.z + z  }

        currentObject.position = NewActiveObjectPosition;

        const updatedItems = [...contextData.state.objects.slice(0, contextData.state.activeObject), currentObject, ...contextData.state.objects.slice(contextData.state.activeObject + 1)]
        console.log(updatedItems)
        contextData.dispatchState({
            ...contextData.state,
            objects: updatedItems
        })
    }




    return (
        <div className='object-control'>
            <div className="position-control">
                <button onClick={()=>onRePositionHandler(-100,0,-100)} className='plus45Degree'><i className="fas fa-arrow-left"></i></button>
                <button onClick={()=>onRePositionHandler(0,100,0)} ><i className="fas fa-arrow-up"></i></button>
                <button onClick={()=>onRePositionHandler(0,0,100)} className='plus45Degree'><i className="fas fa-arrow-up"></i></button>
                <button onClick={()=>onRePositionHandler(-100,0,0)}><i className="fas fa-arrow-left"></i></button>
                <lable>Positions</lable>
                <button onClick={()=>onRePositionHandler(100,0,0)}><i className="fas fa-arrow-right"></i></button>
                <button onClick={()=>onRePositionHandler(0,0,-100)} className='plus45Degree'><i className="fas fa-arrow-down"></i></button>
                <button onClick={()=>onRePositionHandler(0,-100,0)}><i className="fas fa-arrow-down"></i></button>
                <button onClick={()=>onRePositionHandler(100,0,100)} className='plus45Degree'><i className="fas fa-arrow-right"></i></button>
            </div>
            <div className='rotation-control'>
                <button onClick={()=>onRotateHandler('z',.10)}><i className="fas fa-undo"></i></button>
                {/*<button onClick={()=>onRotateHandler('y',.10)}>Z</button>*/}
                <button onClick={()=>onRotateHandler('z',-.10)} className='negative-direction'><i className="fas fa-undo"></i></button>

            </div>
            <div className='size-control'>
                <button className='plus45Degree'><i className="fas fa-arrow-left"></i></button>
                <button onClick={()=>onResizeHandler(0,.1,0)}><i className="fas fa-arrow-up"></i></button>
                <button onClick={()=>onResizeHandler(0,0,.1)} className='plus45Degree'><i className="fas fa-arrow-up"></i></button>
                <button onClick={()=>onResizeHandler(-.1,0,0)}><i className="fas fa-arrow-left"></i></button>
                <lable>size</lable>
                <button onClick={()=>onResizeHandler(.1,0,0)}><i className="fas fa-arrow-right"></i></button>
                <button onClick={()=>onResizeHandler(0,0,-.1)} className='plus45Degree'><i className="fas fa-arrow-down"></i></button>
                <button onClick={()=>onResizeHandler(0,-.1,0)}><i className="fas fa-arrow-down"></i></button>
                <button  className='plus45Degree'><i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    );
};
export default ObjectControl;
