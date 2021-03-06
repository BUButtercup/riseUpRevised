import './style.css'
import PostBox from '../../components/PostBox/'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import API from '../../utils/API'

const PostEdit = props => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [postToEdit, setPostToEdit] = useState({})
  const [editedPost, setEditedPost] = useState({
    likeCount: postToEdit.likeCount,
    title: postToEdit.title,
    body: postToEdit.body
  })
  useEffect(() => {
    API.getPost(id)
      .then(responseJson => {

        console.log('=================postData', responseJson)
        console.log('edit post line 17', responseJson)
        setPostToEdit(responseJson)
      }).catch(err => {
        console.log(err)
        alert(`There was an error: ${err}`)
      })
  }, [])

  const handleInputEdit = e => {
    e.preventDefault();
    console.log('you\'re typing', e.target.name, e.target.defaultValue, e.target.value)
    setEditedPost({
      ...editedPost,
      [e.target.name]: e.target.value
    })
  }


  const editPost = e => {
    e.preventDefault();
    console.log('this is the new post', editedPost)
    if (editedPost.title === '') {
      alert('You need to give your post a title!')
      return
    }
    if (editedPost.body === '') {
      alert('You need to add a message to your post!')
      return
    }
    if (editedPost.title !== '' && editedPost.body !== '') {
      API.editPost(id, editedPost)
        .then((newData) => {
          console.log(newData)
          navigate(`/forums/post/${id}`)
        }).catch((err) => {
          console.log('There was a problem: ', err)
          alert({ message: 'there was an error: ', err })
        })
    }
  }

  return (

    <div className="write">
      <div>
        <button onClick={() => navigate(`/forums/post/${postToEdit.id}`)} className='SF-home-btn TF'>Return to Post</button>
        <button onClick={() => navigate(`/forums/${postToEdit.topic}`)} className='SF-home-btn TF'>Return to Topic</button>
      </div>
      <h1>Edit Your Post</h1>
      <p>Fix what you want fixed below, then hit the button! Remember, keep it respectful of others! This is a place for seeking positive growth and change.</p>
      <PostBox handleInputChange={handleInputEdit} title={editedPost.title} body={editedPost.body} oldTitle={postToEdit.title} boxContent={postToEdit.body} />

      <button
        onClick={editPost}
        className="SF-home-btn TF">Edit</button>
    </div>

  )
}

export default PostEdit