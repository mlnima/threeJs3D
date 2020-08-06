import React, {useEffect, useState, useContext, useRef} from 'react';
import BicyclesOption from "../BicyclesOption";
import './Main.scss'
import ObjectEditor from "../Pages/ObjectEditor/ObjectEditor";
const Main = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='main'>
            <ObjectEditor/>
        </div>
    );
};
export default Main;
