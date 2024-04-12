import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Navbar from './components/navbar';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';

const App = () => {
    return (
        <>
            <BrowserRouter>
            <h1>Hellow World 1</h1>
            <Navbar />
                <Routes>
                    <Route exact path="/" element="Home ?" />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>

            </BrowserRouter>
        </>
    );
};

export default App;