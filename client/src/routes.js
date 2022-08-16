import React from "react";
import { Route, Routes,Navigate } from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
export const useRoutes = isAuthenticated=>{
if(isAuthenticated){
    return(
        <Routes>
            <Route path='/links' element={<LinksPage/>}>
            </Route>
            <Route path='/create' element={<CreatePage/>}>
            </Route>
            <Route path='/detail/:id' element={<DetailPage/>}>
            </Route>
            <Route
                path="/"
                element={<Navigate to="/create" replace />}
            />
        </Routes>
    )
}
return (
    <Routes>
        <Route path='/' element={<AuthPage/>}>
        </Route>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
    </Routes>
)
}