import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainStep from '../Pages/Form/MainStep';

const Navigation = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainStep />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navigation