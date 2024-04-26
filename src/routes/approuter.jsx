import React from 'react'
import {Routes, Route } from "react-router-dom";
import {Home} from '../pages/home'
import { FetchAlbumsWebApi, AlbumsWebApiList, AlbumWebApiView } from '../pages/albums-webapi';


export function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/albums-webapi" element={<FetchAlbumsWebApi />}>
        <Route index element={<AlbumsWebApiList />} />
        <Route index path=':albumId' element={<AlbumWebApiView />} />
      </Route>
    </Routes>
  )
}