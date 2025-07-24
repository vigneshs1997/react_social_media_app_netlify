import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'

const EditPost = () => {
  const { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody } = useContext(DataContext) //Array Destructure
  const { id } = useParams()//getting id from the param
  const post = posts.find((post) => { return (post.id).toString() === id })
  useEffect(() => {//for single time initial loading
    if (post) {
      setEditTitle(post.title);//initially showing the existing respective title
      setEditBody(post.body);//initially showing the existing respective body 
    }
  },[post,setEditBody,setEditTitle])
  return (
    <main className='NewPost'>
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              id='postTitle'
              type='text'
              value={editTitle}
              onChange={(e) => {setEditTitle(e.target.value)}}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
              id='postBody'
              type='text'
              value={editBody}
              onChange={(e)=>{setEditBody(e.target.value)}}
            />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
          </form>
        </>
      }
      {!editTitle &&
        <>
          <h2>Post Not Found</h2>
          <p>`Well, that's dissapointing.`</p>
          <p><Link to='/'>Visit Our Home Page</Link></p>
        </>
      }
    </main>
  )
}

export default EditPost
