import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { createBuffPost } from '../../api/buffposts'

const CreateBuffPost = ({ user, msgAlert }) => {
  const [buffpost, setBuffPost] = useState({
    content: '',
    image: ''
  })
  const [createdId, setCreatedId] = useState('')

  console.log('buffpost data ', buffpost)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createBuffPost(user, buffpost)
      console.log('res ', res.data.buffpost)
      setCreatedId(res.data.buffpost.id)

      msgAlert({
        heading: 'Buff Post Created',
        message: `Created ${buffpost.content} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create buff post',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (!user) {
    return <Navigate to='/' />
  } else if (createdId) {
    return <Navigate to={`/buffposts/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Create Buff Post</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              placeholder='Buff Post Content'
              type='content'
              value={buffpost.content}
              onChange={event =>
                setBuffPost(prev => ({ ...prev, type: event.target.value }))
              }
            />
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder='Image'
              image='image'
              value={buffpost.image}
              onChange={event =>
                setBuffPost(prev => ({ ...prev, image: event.target.value }))
              }
            />
          </Form.Group>

          <Button className='mt-2' variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        handleSubmit={handleSubmit}
        buffpost={buffpost}
        setBuffPost={setBuffPost}
      </div>
    </div>
  )
}

export default CreateBuffPost
