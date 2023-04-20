import './App.css';
import React, { useState, useRoutes } from 'react';
import {Outlet} from 'react-router-dom';
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
import PageNotAllowed from './PlantPNA';
import PlantTheme from './PlantTheme';
import PlantUserChat from './PlantUserChat';
import PlantMarketplace from './PlantMarketplace';
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
                  <Route path='/' element={<PlantHome/>}/>
                  <Route path='/plantnew' element={<PlantTheme component={<PlantNew/>}/>} />
                  <Route path='/plantinfo' element={<PlantTheme component={<Outlet/>}/>}>
                    <Route path=':plantid' element={<PlantInfo />} />
                  </Route>
                  <Route path='/plantinfoedit' element={<PlantTheme component={<Outlet/>}/>}>
                    <Route path=':planteditid' element={<PlantInfoEdit />} />
                  </Route>
                  <Route path='/users' element={<PlantUsers />} />
                  <Route path='/usernew' element={<PlantTheme component={<UserNew/>}/>} />
                  <Route path='/userinfo' element={<PlantTheme component={<Outlet/>}/>}>
                    <Route path=':userid' element={<PlantUserInfo />} />
                  </Route>
                  <Route path='/chat' element={<PlantTheme component={<PlantUserChat/>}/>}/>
                  <Route path='/market' element={<PlantTheme component={<PlantMarketplace/>}/>}/>
                  <Route path='/userinfoedit' element={<PlantTheme component={<Outlet/>}/>}>
                    <Route path=':usereditid' element={<UserInfoEdit />} />
                  </Route>
                  <Route path='/login' element={<PlantTheme component={<Login/>}/>} />
                  <Route path='/profile' element={<PlantTheme component={<Profile/>}/>} />
                  <Route path='/reg' element={<PlantTheme component={<Register/>}/>} />
                  <Route path='/pna' element={<PlantTheme component={<PageNotAllowed/>}/>} />
                  <Route path='*' element={<PlantTheme component={<PlantPNF/>}/>}/>
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
