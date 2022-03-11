import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteBuffPost, getOneBuffPost } from '../../api/buffpost'

const BuffPost = ({ user, msgAlert }) => {
  const [buffpost, setBuffPost] = useState({})
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOneBuffPost(user, id)
        console.log('res ', res.data)
        setBuffPost(res.data.buffpost)
      } catch (error) {
        msgAlert({
          heading: 'Buffpost unable to load',
          message: error.message,
          variant: 'danger'
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

            <Button variant='danger' onClick={onDeleteBuffPost}>Delete Buff Post</Button>
            <Link to={`/buffposts/${id}/edit`}>
              <Button variant='primary' type='submit'>Edit Buff Post</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default BuffPost
