import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { createBuffPost } from '../../api/buffpost'
import Form from 'react-bootstrap/Form'

const BuffPostCreate = ({ user, msgAlert }) => {
  const [buffpost, setBuffPost] = useState({
    content: '',
    image: ''
  })
  const [createdId, setCreatedId] = useState('')

  console.log('buffpost ', buffpost)
  if (!user) {
    return <Navigate to='/' />

  const onBuffPostCreate = async event => {
    event.preventDefault()

    try {
      const res = await createBuffPost(user, buffpost)
      console.log('res ', res.data.buffpost)
      setCreatedId(res.data.buffpost.id)

      msgAlert({
        heading: 'BuffPost Created',
        message: `Created ${buffpost.type} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create buffpost',
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
        <h3>Create A BuffPost</h3>
        <Form onBuffPostCreate={onBuffPostCreate}
          buffpost={buffpost}
          setBuffPost={setBuffPost}
        />
      </div>
    </div>
  )
}

export default BuffPostCreate
