import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteProfile, getProfileById } from '../../api/profiles'

const Profile = ({ user, msgAlert }) => {
  const [profile, setProfile] = useState({})
  //   const [content, setContent] = useState({})
  //   const [image, setImage] = useState({})
  const [deleted, setDeleted] = useState(false)
  //   const [showProfileUpdate, setShowProfileUpdate] = useState(false)
  const { id } = useParams()

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfileById(user, id)
        console.log('res ', res.data)
        setProfile(res.data.profile)
        return res.date.profile.id
      } catch (error) {
        msgAlert({
          heading: 'Buff Profile Loaded'
          // message: error.message,
          // variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const onDeleteProfile = async () => {
    try {
      await deleteProfile(user, id)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete Profile',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (!profile) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading Buff Posts...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/profiles/' />
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Buff Name: {profile.name}</h1>
            <h3>About Me: {profile.about}</h3>

            <Button variant='danger' onClick={onDeleteProfile}>
              Delete Profile
            </Button>
            <Link to={`/profiles/${id}/update`}>
              <Button variant='primary' type='submit'>
                Update Profile
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Profile
