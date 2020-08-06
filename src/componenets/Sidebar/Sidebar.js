import React, {useEffect, useState, useContext, useRef} from 'react';
import './Sidebar.scss'
import {AppContext} from "../../context/AppContext";
import InternalObjects from "./InternalObjects/InternalObjects";
import ObjectControl from "./ObjectControl/ObjectControl";

const Sidebar = props => {
    const contextData = useContext(AppContext);
    const inputElement = useRef(null)
    const colorPreviewElement = useRef(null)

    const onFileUploadHandler = e => {

        const filesArray = [...e.target.files]
        // console.log(e.target.files)
        contextData.dispatchState({
            ...contextData.state,
            objects: [...contextData.state.objects, {
                objectFile: filesArray.filter(file=>file.name.includes('.obj'))[0],
                material: filesArray.filter(file=>file.name.includes('.mtl'))[0],
                position: {x: contextData.state.activeObjectPosition.x , y: contextData.state.activeObjectPosition.y, z: contextData.state.activeObjectPosition.z},
                color:'#222',
                rotate:{x:0,y:0,z:0},
                scale:{x:1,y:1,z:1},
                type: 'external'
            }],
            activeObject: contextData.state.activeObject + 1,
            activeObjectPosition:{x: contextData.state.activeObjectPosition.x + 100, y: contextData.state.activeObjectPosition.y, z: contextData.state.activeObjectPosition.z}
        })

       e.target.value = ''
    }



    const onColorChangeHandler = e=>{

    }

    return (
        <aside className='sidebar'>
            <input ref={inputElement} className='file-input' type='file' onChange={e => onFileUploadHandler(e)} multiple="multiple"/>
            <input ref={colorPreviewElement} className='color-input' type='color' onChange={e=>onColorChangeHandler(e)} value={contextData.state.objects[contextData.state.activeObject] ? contextData.state.objects[contextData.state.activeObject].color : 'white'}  />
            <p>color preview</p>
            <div className='color-preview' style={{
                backgroundColor:contextData.state.objects[contextData.state.activeObject] ? contextData.state.objects[contextData.state.activeObject].color : 'white'
            }} onClick={()=>colorPreviewElement.current.click()} />
            <button className='upload-button' onClick={() => inputElement.current.click()}><i className="fas fa-cloud-upload-alt"></i>Upload New Object</button>
            <ObjectControl/>
        </aside>
    );
};
export default Sidebar;
