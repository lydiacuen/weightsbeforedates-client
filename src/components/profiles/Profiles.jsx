import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getProfile } from '../../api/profiles'
import { Spinner } from 'react-bootstrap'

const Profiles = ({ user, msgAlert }) => {
  const [profiles, setProfiles] = useState([])
  const [navigateCreate] = useState(false)

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile(user)
        console.log('res ', res.data)
        setProfiles(res.data.profiles)
      } catch (error) {
        msgAlert({
          heading: 'Profiles Feed Failed to Load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  console.log('profile ', profiles)

  if (profiles === null) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading Profiles...</span>
      </Spinner>
    )
  } else if (profiles.length === 0) {
    return <h1>No Buff People Have Created Buff Profiles</h1>
  } else if (navigateCreate) {
    return <Navigate to='/profiles/create' />
  } else {
    const profileFeed = profiles.map(profile => (
      <li key={profile.id}>
        <Link to={`/profiles/${profile.id}`}>
          {profile.name} - {profile.about} -  <button className='btn btn-primary'>Follow</button>
        </Link>
      </li>
    ))
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h3>Profiles</h3>
            <ul>{profileFeed}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Profiles
