import React, {useEffect, useState, createContext} from 'react';


export const AppContext = createContext();


const AppProvider = props => {
    const [state, dispatchState] = useState({
        objects:[],
        activeObject:-1,
        activeObjectPosition:{x:0,y:0,z:0},
        activeCameraPosition:{
            x:0,
            z:0,
            y:0
        }
    });

    return (
        <AppContext.Provider
            value={ {
                state,
                dispatchState } }>

            { props.children }
        </AppContext.Provider>
    );
};
export default AppProvider;
