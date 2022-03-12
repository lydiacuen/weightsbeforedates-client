/* eslint-disable no-tabs */
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import Home from './Home'
import BuffPosts from './components/buffpost/BuffPosts'
import BuffPost from './components/buffpost/BuffPost'
import CreateBuffPost from './components/buffpost/CreateBuffPost'
import UpdateBuffPost from './components/buffpost/UpdateBuffPost'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profiles/Profile'
import CreateProfile from './components/profiles/CreateProfile'
import UpdateProfile from './components/profiles/UpdateProfile'
import Rules from './components/Rules'

const App = () => {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(msgAlerts => [...msgAlerts, { heading, message, variant, id }])
  }

  return (
    <>
      <Header user={user} />
      {msgAlerts.map(msgAlert => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
        />
      ))}
      <main className='container'>
        <Routes>
          <Route
            path='/profiles/'
            element={<Profiles msgAlert={msgAlert} user={user} />}
          />
          <Route
            path='/profiles/:id'
            element={<Profile msgAlert={msgAlert} user={user} />}
          />
          <Route
            path='/profiles/create'
            element={
              <CreateProfile
                user={user}
                setUser={setUser}
                msgAlert={msgAlert}
              />
            }
          />
          <Route
            path='/profiles/:id/update'
            element={<UpdateProfile msgAlert={msgAlert} user={user} />}
          />
          <Route path='/rules' element={<Rules />} />
          <Route
            path='/sign-up'
            element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path='/sign-in'
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path='/sign-out'
            element={
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            }
          />
          <Route
            path='/change-password'
            element={<ChangePassword msgAlert={msgAlert} user={user} />}
          />
          <Route path='/' element={<Home />} />
          <Route
            path='/buffposts/'
            element={<BuffPosts msgAlert={msgAlert} user={user} />}
          />
          <Route
            path='/buffposts/:id'
            element={<BuffPost msgAlert={msgAlert} user={user} />}
          />
          <Route
            path='/buffposts/create'
            element={<CreateBuffPost msgAlert={msgAlert} user={user} />}
          />
          <Route
            path='/buffposts/:id/update'
            element={<UpdateBuffPost msgAlert={msgAlert} user={user} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
