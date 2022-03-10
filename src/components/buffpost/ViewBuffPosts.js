import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'

import { getBuffPosts } from '../../api/buffposts'

const BuffPosts = ({ user }) => {
  const [buffposts, setBuffPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    try {
      const res = await getBuffPosts(user)
      setBuffPosts(res.data.buffposts)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }, [])

  if (!user) {
    return <Navigate to='/' />
  }

  const renderedBuffPosts = buffposts.map(buffpost => {
    return (
      <li key={buffpost.id}>
        <Link to={`/buffposts/${buffpost.id}`}>
          <h3>{buffpost.content}</h3>
          <h5>{buffpost.image}</h5>
        </Link>
      </li>
    )
  })

  const listBuffPosts = <ul>{renderedBuffPosts}</ul>

  return (
    <>
      <h3>Buff Posts:</h3>
      {!loading ? listBuffPosts : <h3>Loading...</h3>}
    </>
  )
}

export default BuffPosts
