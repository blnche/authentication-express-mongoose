import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Navbar from './components/navbar';
import RecordList from './components/recordList';
import Create from './components/create';
import Edit from './components/edit'

const App = () => {
    return (
        <>
            <BrowserRouter>
            <h1>Hellow World 1</h1>
            <Navbar />
                <Routes>
                    <Route exact path="/" element={<RecordList />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Routes>

            </BrowserRouter>
        </>
    );
};

export default App;