import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { createBuffPost } from '../../api/buffposts'

const CreateBuffPost = ({ user, msgAlert }) => {
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  const onCreateBuffPost = async event => {
    event.preventDefault()

    try {
      await createBuffPost(user, content, image)
      msgAlert({
        heading: 'Buffpost Created!',
        message: `Buffpost ${content} posted on Buff Post Feed!`,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error) {
      msgAlert({
        heading: 'Create Buff Post Failed: ' + error.message,
        message: 'Failed to post the buff post',
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
        <h3>Create Buff Post</h3>
        <Form onSubmit={onCreateBuffPost}>
          <Form.Group className='mb-4' controlId='content'>
            <Form.Label>Buff Post Content</Form.Label>
            <Form.Control
              required
              content='content'
              // type='text'
              placeholder='Add your buff post here'
              value={content}
              onChange={event => setContent(event.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='image'>
            <Form.Label>Buff Post Image</Form.Label>
            <Form.Control
              required
              image='image'
              // type='text'
              placeholder='Add your buff post image here'
              value={image}
              onChange={event => setImage(event.target.value)}
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

export default CreateBuffPost
