import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getBuffPost, updateBuffPost } from '../../api/buffposts'

const UpdateBuffPost = ({ user, msgAlert }) => {
  const [buffpost, setBuffPost] = useState({
    content: '',
    image: ''
  })
  const [updated, setUpdated] = useState(false)
  const { id } = useParams()

  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBuffPost(user, id)
        console.log('res ', res.data)
        setBuffPost(res.data.buffpost)
      } catch (error) {
        msgAlert({
          heading: 'Unable to load buff post',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])
  console.log('buffpost data', buffpost)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateBuffPost(user, id, buffpost)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Unable to update buffpost',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    return <Navigate to={`/buffposts/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Buff Post</h3>
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

export default UpdateBuffPost
