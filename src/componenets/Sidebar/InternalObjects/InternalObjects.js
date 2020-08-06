import React, {useEffect, useState, useContext, useRef} from 'react';
import BoxGeometry from '../../../images/BoxGeometry.png'
import CircleBufferGeometry from '../../../images/CircleBufferGeometry.png'
import ConeBufferGeometry from '../../../images/ConeBufferGeometry.png'
import './InternalObjects.scss'
import {AppContext} from "../../../context/AppContext";
import * as THREE from 'three'




const InternalObjects = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        internalObjects:['BoxGeometry','CircleBufferGeometry','ConeBufferGeometry']
    });
    useEffect(() => {
    }, []);

    const onClickHandler = e =>{
        let object = new THREE[e.target.name](1, 1, 1);
        let material = new THREE.MeshBasicMaterial({color: 'green',});
        let mesh = new THREE.Mesh(object, material);
        contextData.dispatchState({
            ...contextData.state,
            objects:[...contextData.state.objects,{mesh,position: {x:0,y:0,z:0},type:'internal'}]
        })
    }



    const renderInternalObjectsPreview = state.internalObjects.map(internalObject=>{
        const imageSource = internalObject === 'BoxGeometry' ? BoxGeometry :
              internalObject === 'CircleBufferGeometry'?CircleBufferGeometry :
              internalObject === 'ConeBufferGeometry'?ConeBufferGeometry :''
        return(
            <div className='internal-object-preview'>
                <img name={internalObject} onClick={e=>onClickHandler(e)} className='internal-object-preview-image' src={imageSource} alt=""/>
            </div>
        )
    })

    return (
        <div className='internal-objects'>
            {renderInternalObjectsPreview}
        </div>
    );
};
export default InternalObjects;
