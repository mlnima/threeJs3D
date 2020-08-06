import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import * as THREE from 'three'
import './ObjectEditor.scss'
import OrbitControls from 'three-orbitcontrols';
import {MTLLoader, OBJLoader, MtlObjBridge} from 'three-obj-mtl-loader'
import STLLoader from 'three-stl-loader'
import boxTexture from "../../../objects/download.jpg";
// import * as MtlObjBridge from "three";
// import {MtlObjBridge} from './resources/threejs/r119/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
OBJLoader(THREE);
STLLoader(THREE);

const ObjectEditor = props => {
    const contextData = useContext(AppContext);
    const ObjectComponentElement = useRef(null)

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let quaternion = new THREE.Quaternion();
    let camera
    let scene
    let renderer
    let mesh
    let mesh2
    let geometry
    let geometry2
    let material
    let controls
    let color
    let objectLoader
    let mtlLoader
    let objLoader
    let stlLoader


    useEffect(() => {
        objectLoaderToScene()
        animate()
        window.addEventListener('mousemove', onMouseMove, false)
        window.addEventListener('click', onClickOnObjectHandler, false)
        window.addEventListener('contextmenu', onContextMenuHandler, false)
        window.addEventListener('resize', onWindowResize, false)
        window.requestAnimationFrame(animate);
    }, [contextData.state.objects]);


    const objectLoaderToScene = () => {
        ObjectComponentElement.current.querySelectorAll('*').forEach(n => n.remove());
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = contextData.state.activeObjectPosition.z -300;
        camera.position.y = contextData.state.activeObjectPosition.y +300;
        camera.position.x = contextData.state.activeObjectPosition.x + 300;
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls = new OrbitControls(camera, renderer.domElement);

        //------------------Light---------------
        let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
        keyLight.position.set(-100, 0, 100);
        let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
        fillLight.position.set(100, 100, 100);
        let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
        backLight.position.set(100, -100, -100).normalize();
        scene.add(keyLight);
        scene.add(fillLight);
        scene.add(backLight);
        //------------------Light---------------//
        contextData.state.objects.map(objectData => {

            if (objectData.material) {
                if (objectData.material.name) {
                    mtlLoader = new MTLLoader();
                    objLoader = new OBJLoader();
                    mtlLoader.load(URL.createObjectURL(objectData.material), (materials) => {
                        materials.preload();
                        objLoader.setMaterials(materials)
                        objLoader.load(URL.createObjectURL(objectData.objectFile), object => {
                            // object.scale.set(objectData.scale.x, objectData.scale.y, objectData.scale.z)
                            scene.add(object);
                        });
                    });
                    objLoader = new OBJLoader();
                    objLoader.load(URL.createObjectURL(objectData.objectFile), object => {
                        object.scale.set(objectData.scale.x, objectData.scale.y, objectData.scale.z)
                        scene.add(object);
                    });
                } else {
                    objLoader = new OBJLoader();
                    objLoader.load(URL.createObjectURL(objectData.objectFile), object => {
                        object.scale.set(objectData.scale.x, objectData.scale.y, objectData.scale.z)
                        scene.add(object);
                    });
                }

            } else {
                objLoader = new OBJLoader();

                objLoader.load(URL.createObjectURL(objectData.objectFile), object => {
                    object.scale.set(objectData.scale.x, objectData.scale.y, objectData.scale.z)
                    object.position.set(objectData.position.x, objectData.position.y, objectData.position.z)
                    console.log(objectData.position)
                    object.rotateX(objectData.rotate.x)
                    object.rotateY(objectData.rotate.y)
                    object.rotateZ(objectData.rotate.z)
                    scene.add(object);
                });
            }

            ObjectComponentElement.current.appendChild(renderer.domElement)
        })
    }


    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }


    const onClickOnObjectHandler = () => {
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children);

        intersects.forEach(child => {
            // intersects[intersects.indexOf(child)].object.material.color.set("green");

            const position = JSON.parse(JSON.stringify(intersects[intersects.indexOf(child)].object.position))
            // intersects.forEach(childToRemoveColor => {
            //     if (intersects.indexOf(childToRemoveColor) !== intersects.indexOf(child)) {
            //         const texture = new THREE.TextureLoader().load(boxTexture)
            //         intersects[intersects.indexOf(childToRemoveColor)].object.material = new THREE.MeshBasicMaterial({map: texture})
            //     }
            // })
            console.log(position)
            // contextData.dispatchState({
            //     ...contextData.state,
            //     activeObject: position
            // })
        })

        renderer.render(scene, camera);
    }


    const onContextMenuHandler = () => {

        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children);

        intersects.forEach(child => {
            const texture = new THREE.TextureLoader().load(boxTexture)
            // intersects[intersects.indexOf(child)].object.material = new THREE.MeshBasicMaterial({map: texture})
            intersects[intersects.indexOf(child)].object.material = null

        })
        renderer.render(scene, camera);
    }


    const onMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        // contextData.dispatchState({
        //     ...contextData.state,
        //     activeCameraPosition:{
        //         ...contextData.state.activeCameraPosition,
        //         x:mouse.x,
        //         y:mouse.y
        //     }
        // })
    }


    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    useEffect(() => {
        console.log(contextData.state)
    }, [contextData.state]);


    // useEffect(() => {
    //     console.log(camera)
    // }, [camera.position]);
    return (
        <div className='ObjectEditor'>
            <div ref={ObjectComponentElement} id='ObjectComponentElement'/>
        </div>
    );
};
export default ObjectEditor;
