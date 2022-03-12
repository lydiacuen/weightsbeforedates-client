import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getProfileById, updateProfile } from '../../api/profiles'

const UpdateProfile = ({ user, msgAlert }) => {
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const { id } = useParams()

  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(async () => {
    try {
      const res = await getProfileById(user, id)
      setName(res.data.course.name)
      setAbout(res.data.course.about)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const onUpdateProfile = async event => {
    event.preventDefault()
    try {
      await updateProfile(user, id, name, about)
      msgAlert({
        heading: 'Profile Updated!',
        message: `Profile ${name} posted on Buff Post Feed!`,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error) {
      msgAlert({
        heading: 'Update Buff Post Failed: ' + error.message,
        message: 'Failed to update the buff post',
        variant: 'danger'
      })
    }
  }

  if (!user || shouldNavigate) {
    return <Navigate to='/' />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Update Buff Post</h3>
        <Form onSubmit={onUpdateProfile}>
          <Form.Group className='mb-4' controlId='name'>
            <Form.Label>Update Buff Name</Form.Label>
            <Form.Control
              required
              name='name'
              // type='text'
              placeholder='Update your buff post here'
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='about'>
            <Form.Label>Update Your About Me</Form.Label>
            <Form.Control
              required
              about='about'
              // type='text'
              placeholder='Update your about me'
              value={about}
              onChange={event => setAbout(event.target.value)}
            />
          </Form.Group>
          <Button className='mt-2' variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
export default UpdateProfile
