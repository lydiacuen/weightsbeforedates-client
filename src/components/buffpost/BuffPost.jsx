import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteBuffPost, getOneBuffPost } from '../../api/buffpost'

const BuffPost = ({ user, msgAlert }) => {
  const [buffpost, setBuffPost] = useState({})
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()
  const [shouldNavigate, setShouldNavigate] = useState(false)

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOneBuffPost(user, id)
        console.log('res ', res.data)
        setBuffPost(res.data.BuffPost)
      } catch (error) {
        msgAlert({
          heading: 'Buffpost failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const onDeleteBuffPost = async () => {
    try {
      await deleteBuffPost(user, id).then(
        delete user.buffpost,
        setShouldNavigate(true),
        msgAlert({
          heading: 'Buffpost Deleted Successfully',
          message: buffpostDeleteSuccess,
          variant: 'success'
        })
      )
    } catch (error) {
      msgAlert({
        heading: 'Failed to Delete Buffpost',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (shouldNavigate) {
    return <Navigate to='/' />
  }

  if (!buffpost) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/buffposts/' />
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Type: {buffpost.type}</h1>
            <h3>Buffpost: {account.account_number}</h3>
            <h3>Company: {account.company}</h3>
            <h3>Balance: {account.balance}</h3>
            <h3>Inception: {account.inception}</h3>

            <Button variant='danger' onClick={onDeleteBuffPost}>Delete Account</Button>
            <Link to={`/accounts/${id}/edit`}>
              <Button variant='primary' type='submit'>Update Account</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Account