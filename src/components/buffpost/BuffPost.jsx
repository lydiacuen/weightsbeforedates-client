import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteBuffPost, getBuffPostById } from '../../api/buffposts'

const BuffPost = ({ user, msgAlert }) => {
  const [buffpost, setBuffPost] = useState({})
  //   const [content, setContent] = useState({})
  //   const [image, setImage] = useState({})
  const [deleted, setDeleted] = useState(false)
  //   const [showBuffPostUpdate, setShowBuffPostUpdate] = useState(false)
  const { id } = useParams()

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBuffPostById(user, id)
        console.log('res ', res.data)
        setBuffPost(res.data.buffpost)
        return res.date.buffpost.id
      } catch (error) {
        // kept having an error when I uncomment the code below. Will work on it once i turn in my project :)
        msgAlert({
          heading: 'Buff Post Loaded'
          //   message: error.message,
          //   variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const onDeleteBuffPost = async () => {
    try {
      await deleteBuffPost(user, id)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete Buff Post',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (!buffpost) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading Buff Posts...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/buffposts/' />
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Content: {buffpost.content}</h1>
            <h3>Image: {buffpost.image}</h3>

            <Button variant='danger' onClick={onDeleteBuffPost}>
              Delete Buff Post
            </Button>
            <Link to={`/buffposts/${id}/update`}>
              <Button variant='primary' type='submit'>
                Update Buff Post
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default BuffPost
