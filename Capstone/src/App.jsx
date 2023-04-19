import './App.css';
import React, { useState, useRoutes } from 'react';
import PlantHome from './PlantHome'
import PlantPNF from './PlantPNF';
import { Routes, Route, Router } from 'react-router-dom';
import Navbar from './PlantNavBar';
import { PlantInfo } from './PlantInfo';
import PlantUsers from './Users';
import { PlantUserInfo } from './UserInfo'
import { PlantInfoEdit } from './PlantInfoEdit';
import Login from './Login';
import Register from './Register';
import { Profile } from './Profile';
import { PlantNew } from './PlantNew';
import { UserNew } from './UserNew';
import { UserInfoEdit } from './UserInfoEdit';
import PgaeNotAllowed from './PNA';
import PlantThemeOutlet from './PlantThemeOutlet';
export const PlantContext = React.createContext();
export const UsersContext = React.createContext();
export const CurrentUserContext = React.createContext();
export const PageTypeContext = React.createContext();
export const DropDownContext = React.createContext();
export const PlantLikeContext = React.createContext();



function App() {
  const [plants, setPlants] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [pageType, setPageType] = useState('')
  const [dropDown, setDropDown] = useState('')
  const [plantLike, setPlantLike] = useState (0)
  return (
    <PlantContext.Provider value={{ plants, setPlants }}>
      <UsersContext.Provider value={{ users, setUsers }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <PageTypeContext.Provider value={{ pageType, setPageType }}>
            <DropDownContext.Provider value={{ dropDown, setDropDown }}>
            <PlantLikeContext.Provider value={{plantLike, setPlantLike}}>
              <div>
                <Navbar />
                <Routes>
                  <Route path='/' element={<PlantHome />} />
                  <Route path='/plantnew' element={<PlantNew />} />
                  <Route path='/plantinfo' element={<PlantThemeOutlet />}>
                    <Route path=':plantid' element={<PlantInfo />} />
                  </Route>
                  <Route path='/plantinfoedit' element={<PlantThemeOutlet />}>
                    <Route path=':planteditid' element={<PlantInfoEdit />} />
                  </Route>
                  <Route path='/users' element={<PlantUsers />} />
                  <Route path='/usernew' element={<UserNew />} />
                  <Route path='/userinfo' element={<PlantThemeOutlet />}>
                    <Route path=':userid' element={<PlantUserInfo />} />
                  </Route>
                  <Route path='/userinfoedit' element={<PlantThemeOutlet />}>
                    <Route path=':usereditid' element={<UserInfoEdit />} />
                  </Route>
                  <Route path='/login' element={<Login />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/reg' element={<Register />} />
                  <Route path='/pna' element={<PgaeNotAllowed />} />
                  <Route path='*' element={<PlantPNF />} />
                </Routes>
              </div>
              </PlantLikeContext.Provider>
            </DropDownContext.Provider>
          </PageTypeContext.Provider>
        </CurrentUserContext.Provider>
      </UsersContext.Provider>
    </PlantContext.Provider>
  );
}

export default App;
