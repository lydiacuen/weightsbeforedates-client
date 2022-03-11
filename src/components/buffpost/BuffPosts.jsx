import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { indexBuffPost } from '../../api/buffpost'
import { Spinner } from 'react-bootstrap'

const BuffPosts = ({ user, msgAlert }) => {
  const [buffposts, setBuffPosts] = useState([])
  const [navigateCreate] = useState(false)

  if (!user) return <Navigate to ='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await indexBuffPost(user)
        console.log('res ', res.data)
        setBuffPosts(res.data.buffposts)
      } catch (error) {
        msgAlert({
          heading: 'Buffposts Feed Failed to Load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  console.log('buffpost ', buffposts)

  if (buffposts === null) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading Buff Posts...</span>
      </Spinner>
    )
  } else if (buffposts.length === 0) {
    return <h1>No Buff People have posted Buff Posts</h1>
  } else if (navigateCreate) {
    return <Navigate to='/buffposts/create' />
  } else {
    const buffPostFeed = buffposts.map(buffpost => (
      <li key={buffpost.id}>
        <Link to={`/buffposts/${buffpost.id}`}>{buffpost.content} - {buffpost.image}</Link>
      </li>
    ))
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h3>BuffPosts</h3>
            <ul>{buffPostFeed}</ul>
          </div>
        </div>
      </>

    )
  }
}

export default BuffPosts
