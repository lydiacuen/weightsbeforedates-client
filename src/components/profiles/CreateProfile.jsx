import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { createProfile } from '../../api/profiles'

const CreateProfile = ({ user, setUser, msgAlert }) => {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false)

  if (!user) {
    return <Navigate to='/' />
  }

  const onCreateProfile = async event => {
    event.preventDefault()

    try {
      await createProfile(user, name, about)
      msgAlert({
        heading: 'Profile Created!',
        message: `Profile ${name} created!`,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error) {
      msgAlert({
        heading: 'Create Profile Failed: ' + error.message,
        message: 'Failed to create profile',
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
        <h3>Create Buff Profile</h3>
        <Form onSubmit={onCreateProfile}>
          <Form.Group className='mb-4' controlId='name'>
            <Form.Label>Buff Name</Form.Label>
            <Form.Control
              required
              name='name'
              // type='text'
              placeholder='Add your buff name here'
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='about'>
            <Form.Label>About Me</Form.Label>
            <Form.Control
              required
              about='about'
              // type='text'
              placeholder='Workout type or goals :)'
              value={about}
              onChange={event => setAbout(event.target.value)}
            />
          </Form.Group>

          <Button className='mt-2' variant='primary' type='submit'>
            Submit Buff Profile
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateProfile
