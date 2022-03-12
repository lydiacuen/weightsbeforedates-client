import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getBuffPostById, updateBuffPost } from '../../api/buffposts'

const UpdateBuffPost = ({ user, msgAlert }) => {
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const { id } = useParams()

  if (!user) {
    return <Navigate to='/' />
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getBuffPostById(user, id)
  //       console.log('res ', res.data)
  //       setContent(res.data.content)
  //       setImage(res.data.image)
  //     } catch (error) {
  //       msgAlert({
  //         heading: 'Failed to load buffpost',
  //         message: error.message,
  //         variant: 'danger'
  //       })
  //     }
  //   }
  //   fetchData()
  // }, [])
  // console.log('buffpost data', content, image)

  useEffect(async () => {
    try {
      const res = await getBuffPostById(user, id)
      // setBuffPost(res.data.buffpost)
      setContent(res.data.course.content)
      setImage(res.data.course.image)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const onUpdateBuffPost = async event => {
    event.preventDefault()
    try {
      await updateBuffPost(user, id, content, image)
      msgAlert({
        heading: 'Buffpost Updated!',
        message: `Buffpost ${content} posted on Buff Post Feed!`,
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
        <Form onSubmit={onUpdateBuffPost}>
          <Form.Group className='mb-4' controlId='content'>
            <Form.Label>Update Buff Post Content</Form.Label>
            <Form.Control
              required
              content='content'
              // type='text'
              placeholder='Update your buff post here'
              value={content}
              onChange={event => setContent(event.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='image'>
            <Form.Label>Update Buff Post Image</Form.Label>
            <Form.Control
              required
              image='image'
              // type='text'
              placeholder='Update your buff post image here'
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
export default UpdateBuffPost
