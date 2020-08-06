import React, {useState} from 'react';
import './App.scss';
import Header from "./componenets/Header/Header";
import Sidebar from "./componenets/Sidebar/Sidebar";
import Main from "./componenets/Main/Main";
import AppProvider from "./context/AppContext";

const App = () => {

    return (
        <AppProvider>
            <div className="App">
                <Header/>
                <Sidebar/>
                <Main/>
            </div>
        </AppProvider>
    );
}

export default App;
