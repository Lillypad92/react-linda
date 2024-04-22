import React from 'react'
import {Routes, Route } from "react-router-dom";
import {Home} from '../pages/home'
import { AlbumsWebApi, AlbumsWebApiList } from '../pages/albums-webapi';

export function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        
        {/* Nested Routes /}
        {/ Index routes render into their parent's Outlet at their parent's URL */}
        
        <Route path="/albums-webapi" element={<AlbumsWebApi />}>
        <Route index element={<AlbumsWebApiList />} />
      </Route>
    </Routes>
  )
}