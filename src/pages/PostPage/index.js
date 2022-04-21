import { React, useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";
import useAuth from "../../utils/hooks/useAuth";
import PostSingle from "../../components/PostSingle";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Tooltip from '@mui/material/Tooltip';
import ReportIcon from '@mui/icons-material/Report';

const SingleForum = (props) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  let { id } = useParams();
  const [post, setPost] = useState({});

  // const [postLiked, setPostLiked] = useState({
  //   likeCount: '',
  //   title: '',
  //   body: ''
  // })
  // const [newLikeCount, setNewLikeCount] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    body: '',
    author: ''
  });
  // const [commentToEdit, setCommentToEdit] = useState({});
  const [editedComment, setEditedComment] = useState('');
  const [commentEditBox, setCommentEditBox] = useState({});
  const [wantEditComment, setWantEditComment] = useState(false);
  const [seeEditComment, setSeeEditComment] = useState('none');
  const [wantComment, setWantComment] = useState(false);
  const [commId, setCommId] = useState(1)
  const [followed, setFollowed] = useState(false)
  const [likePost, setLikePost] = useState(false)
  const [postFlagged, setpostFlagged] = useState(false)
  const [commentLiked, setCommentLiked] = useState([])
  // const [likeText, setLikeText] = useState([])

  useEffect(() => {
    API.getPost(id)
      .then((responseJson) => {
        console.log("=================postData", responseJson);
        setPost({
          id: responseJson.id,
          userId: responseJson.userId,
          topic: responseJson.topic,
          title: responseJson.title,
          body: responseJson.body,
          author: responseJson.user.username,
          createdAt: responseJson.createdAt,
          likeCount: responseJson.likeCount,
          likes: responseJson.post_is_liked
        });

        console.log('===============commentData', responseJson.Comments)

        const postComments = responseJson.Comments.map(comment => {
          return { ...comment, currentUserLikes: false }
        })

        const postCommentsWLikeStatus = postComments.map((comment) => {
          const arr = comment.comment_is_liked.filter(comm => comm.user_id === auth.userId)
          console.log(arr)

          if (comment.comment_is_liked.filter(comm => comm.user_id === auth.userId).length > 0) {
            return { ...comment, currentUserLikes: true }
          } else {
            return comment
          }

          // const commentLikeStatus = comment.comment_is_liked.map((like) => {
          //   if (like.user_id === auth.userId) {
          //     return true
          //   } else { return false }
          // })
          // setCommentLiked([
          //   ...commentLiked,
          //   commentLikeStatus
          // ])
        })


        setComments(postCommentsWLikeStatus);



        if (responseJson.post_is_liked[0]?.user_id === auth.userId) {
          setLikePost(true)
        }

        if(responseJson.flagged){
          setpostFlagged(true)
        }
        // else {
        //   responseJson.post_is_liked.forEach((id, i) => {
        //     setLikeText([
        //       ...likeText,
        //       `${id[i].like_post.username} likes your post!`
        //     ])
        //   })

        // }
      })
      .catch((err) => {
        console.log(err);
        alert(`There was an error: ${err}`);
      });

    API.getUser(auth.userId)
      .then(resJson => {
        // console.log(resJson)
        if (resJson.active_relationships[0]?.follower_id === auth.userId) {
          setFollowed(true)
        }
      })
      .catch()

  }, []);

  useEffect(() => {
    console.log('comments', comments)
  }, [comments])


  //followAuthor
  const handleFollowAuthor = (id) => {
    console.log('userId', id)
    API.followAuthor(id)
      .then(response => {
        console.log('heres friend response', response)
        console.log('the response is ok!', response.status)
        setFollowed(true)
      })
      .catch(err => {
        console.log("There was a problem: ", err);
        alert({ message: "there was an error: ", err });
      })
  }

  const handleUnfollow = id => {
    console.log('userId', id)
    API.unfollowAuthor(id)
      .then(response => {
        console.log('heres unfriend response', response)
        setFollowed(false)
      })
      .catch(err => {
        console.log("There was a problem: ", err);
        alert({ message: "there was an error: ", err });
      })
  }

  const handleLikePost = (e) => {
    const newPost = {
      ...post,
      likeCount: post.likeCount + 1
    }
    API.likePost(post.id, newPost)
      .then(response => {
        console.log('heres the like post response', response)
        setPost(newPost)
        setLikePost(true)
      })
      .catch(err => {
        console.log("There was a problem: ", err);
        alert("there was an error: ", err);
      })
  }

  const handleUnlikePost = id => {
    const newPost = {
      ...post,
      likeCount: post.likeCount - 1
    }
    API.unlikePost(post.id, newPost)
      .then(response => {
        console.log('heres the like post response', response)
        setPost(newPost)
        setLikePost(false)
      })
      .catch(err => {
        console.log("There was a problem: ", err);
        alert("there was an error: ", err);
      })
  }

  const handleLikeComment = id => {
    const currentComment = comments.filter(comm => {
      return comm.id === id
    })
    console.log('currCOmment', currentComment[0].likeCount)
    const newCurrentComment = {
      ...currentComment,
      likeCount: currentComment[0].likeCount + 1
    }
    delete newCurrentComment.currentUserLikes

    API.likeComment(id, newCurrentComment)
      .then(response => {
        console.log('heres the like comment response', response)
        console.log(newCurrentComment.likeCount)
        const newComments = comments.map(comm => {
          if (comm.id === id) {
            return {
              ...comm,
              likeCount: newCurrentComment.likeCount,
              currentUserLikes: true
            }
          } else {
            return {
              ...comm,
              currentUserLikes: false
            }
          }
        })
        setComments(newComments)
      })
      .catch(err => {
        console.log("There was a problem: ", err);
        alert("there was an error: ", err);
      })

  }

  const handleUnlikeComment = id => {

  }

  //new comment
  const postComment = (e) => {
    e.preventDefault();
    console.log("this is the new comment", newComment);
    if (newComment.body === '') {
      alert('Please add a message to your comment.')
      return
    }
    if (newComment.body !== '') {
      API.saveComment(id, newComment)
        .then((newData) => {
          comments.unshift(newData);
          console.log(newData);
          document.querySelector("form").reset();
          setWantComment(false);
          navigate(`/forums/post/${id}`);
        })
        .catch((err) => {
          console.log("There was a problem: ", err);
          alert({ message: "there was an error: ", err });
        });
    }
  };

  const handleWantComment = (e) => {
    // console.log(likeText)
    e.preventDefault();
    if (wantComment) {
      setWantComment(false);
    } else {
      setWantComment(true);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    console.log("you're typing", e.target.name, e.target.value);
    setNewComment({
      body: e.target.value,
      author: auth.userName
    });
  };

  const handleFlagPost = id => {
    const newPost = {
      ...post,
      flagged: true
    }
    API.flagPost(id, newPost)
    .then(res=>{
      console.log('post flag res', res)
      setPost(newPost)
    })
  }

  //edit comment
  const saveCommentEdit = (e, commId) => {
    e.preventDefault();
    console.log('editedComment', editedComment)
    if (editedComment === '') {
      alert('Please make your edits and save.\nIf you want to delete the comment, \nuse the delete button')
      return
    }
    if (editedComment !== '') {
      API.editComment(commId, editedComment)
        .then(data => {
          console.log(commId)
          const newComments = comments.map(comm => {
            if (comm.id === commId) {
              comm.body = editedComment.body;
              comm.author = auth.userName
              return comm
            } else { return comm }
          })
          setComments(newComments)
          document.querySelector('form').reset();
          const editBoxes = document.querySelectorAll('.edit-comment');
          editBoxes.forEach((box) => {
            box.setAttribute('style', 'display: none;')
          })
        })
    }
  }

  const handleEditedComment = e => {
    e.preventDefault();
    console.log("you're typing", e.target.name, e.target.value);
    setCommentEditBox(e.target);
    setEditedComment({
      body: e.target.value,
      // author: auth.userName
    });
  };


  const getEditComment = (e, id) => {
    e.preventDefault();
    // const commentEditBoxes = document.querySelectorAll
    const editBoxes = document.querySelectorAll('.edit-comment');
    editBoxes.forEach((box) => {
      if (id === parseInt(box.id)) {
        console.log('id', id)
        console.log('here\'s box id', box.id)
        box.setAttribute('style', 'display: block;')
      }
    })
  }

  //delete comment
  const deleteComment = (e, id) => {
    e.preventDefault();
    API.deleteComment(id)
      .then(data => {
        const filteredComments = comments.filter(comm => { if (comm.id !== id) { return comm } })
        setComments(filteredComments)
        console.log('data', data)
      })
  };


  //post CRUD
  const goEdit = (e) => {
    e.preventDefault();
    console.log(post.id);
    navigate(`/forums/edit/post/${parseInt(post.id)}`);
  };

  const deletePost = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "This will remove your post from the forum, do you want to proceed?"
      )
    ) {
      console.log(post.id);
      API.deletePost(id)
        .then((responseJson) => {
          console.log("=================postData", responseJson);
          navigate(`/forums/${post.topic}`);
        })
        .catch((err) => {
          console.log(err);
          alert(`There was an error: ${err}`);
        });
    } else {
      return;
    }
  };

  return (
    <div className=" singleForum">
      <div className="singleFormBox">
        {/* buttons at top of page */}
        <div className='SF-btn-box SF-top-btn'>
          <button
            onClick={() => navigate(`/forums/${post.topic}`)}
            className="SF-home-btn"
          >
            Return to Topic
          </button>
          <button onClick={() => navigate(`/forums`)} className="SF-home-btn">
            Go to Forums
          </button>
        </div>

        <PostSingle
          title={post.title}
          author={post.author}
          id={post.id}
          body={post.body}
          createdAt={post.createdAt}
          comments={comments}
          likeCount={post.likeCount}
          className={'singlePost post-page'}
        />

        {/* big comment box below single post */}
        <div className="SF-comment-box">
          {auth.userId === post.userId ? (
            <div className="singlePostCommentIcon">
              <div onClick={goEdit} className="first-icon icon pp-icon">
                <EditIcon className="singlePostIcon" />
                <p className="pp-icon">Edit Post</p>
              </div>
              <div onClick={deletePost} className="last-icon icon pp-icon">
                <DeleteOutlineIcon className="singlePostIcon" />
                <p>Delete Post</p>
              </div>
              <div onClick={handleWantComment} className="first-icon icon pp-icon">
                <CommentIcon className="singlePostIcon" />
                <p>Comment on Post</p>
              </div>
              <div onClick={handleFlagPost} className="last-icon icon pp-icon">
                <ReportIcon className="singlePostIcon" />
                <p>This Post has Been Flagged</p>
              </div>
            </div>
          ) : (
            <div className="singlePostCommentIcon singlePostCommentBox">


              {!followed ? (<div onClick={() => handleFollowAuthor(post.userId)} className="last-icon icon pp-icon">
                <PersonAddIcon className="singlePostIcon" />
                <p>Follow Author</p>
              </div>) :
                <div onClick={(e) => handleUnfollow(post.userId)} className="last-icon icon pp-icon">
                  <PersonRemoveIcon className="singlePostIcon" />
                  <p>Un-follow Author</p>
                </div>
              }
              <div onClick={handleWantComment} className="first-icon icon pp-icon">
                <CommentIcon className="singlePostIcon" />
                <p>Comment on Post</p>
              </div>


              {!likePost ? (<div onClick={handleLikePost} className="last-icon icon">
                <FavoriteIcon className="singlePostIcon" />
                <p>Like Post</p>
              </div>) :
                <div onClick={() => handleUnlikePost(post.id)} className="last-icon icon">
                  <HeartBrokenIcon className="singlePostIcon" />
                  <p>Unlike Post</p>
                </div>}
              {/* <Tooltip title="Add" placement="top-end" arrow> */}

              {!postFlagged ? (<div onClick={()=>handleFlagPost(post.id)} className="first-icon icon pp-icon">
                <FlagIcon className="singlePostIcon" />
                <p>Flag Post to Send to Moderator</p>
              </div>)
              :
              <div className="last-icon icon pp-icon">
                <ReportIcon className="singlePostIcon" />
                <p>This Post has Been Flagged</p>
              </div>}

              {/* </Tooltip> */}
            </div>
          )}


          {/* comment input box pops up when comment button clicked */}
          {wantComment ? (
            <form className="SF-comment-btn-box">
              <textarea
                id="comment-input"
                name="body"
                onChange={handleComment}
                className="SF-comment-input"
                rows="3"
                placeholder="Leave a comment..."
              ></textarea>
              <button onClick={postComment} className="SF-home-btn">
                Comment
              </button>
            </form>
          ) : null}


          {/* comments are populated as boxes below comment input box */}
          {comments.length ? (
            comments.map((p) => {
              return (
                <div className='big-comment-box'>
                  <div className="whole-comment">
                    <div className="posted-comment" key={p.id}>
                      <p className="posted-comment-body">{p.body}</p>
                      <p>Created on: {p.createdAt}</p>
                      <p>By: {p.author}</p>
                      <div className="last-icon icon comment-icon pp-icon">
                        <FavoriteIcon className="singlePostIcon" />
                        {p.likeCount} like(s)
                      </div>
                    </div>
                    <div className='SF-comm-icon-box'>
                      <div className="singlePostCommentIcon singlePostCommentBox comment-btn-box">

                        {auth.userId !== p.userId ? (
                          <div className="singlePostCommentIcon singlePostCommentBox comment-btn-box">
                            {!p.currentUserLikes ? <div
                              onClick={() => handleLikeComment(p.id)}
                              className="last-icon icon comment-icon pp-icon"
                            >
                              <FavoriteIcon className="singlePostIcon" />
                            </div> :
                              <div onClick={handleUnlikeComment} className="last-icon icon">
                                <HeartBrokenIcon className="singlePostIcon" />
                              </div>}
                            <div
                              onClick={handleWantComment}
                              className="first-icon icon comment-icon pp-icon"
                            >
                              <CommentIcon className="singlePostIcon" />
                            </div>
                            {!followed ? (<div onClick={() => handleFollowAuthor(post.userId)} className="last-icon icon pp-icon">
                              <PersonAddIcon className="singlePostIcon" />
                            </div>) :
                              <div onClick={(e) => handleUnfollow(post.userId)} className="last-icon icon pp-icon">
                                <PersonRemoveIcon className="singlePostIcon" />
                              </div>
                            }
                            <div onClick={handleFlagPost} className="first-icon icon pp-icon">
                              <FlagIcon className="singlePostIcon" />
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {/* buttons on each comment's box */}
                      {auth.userId === p.userId ? (
                        <div className="singlePostCommentIcon singlePostCommentBox comment-btn-box">
                          <div
                            onClick={e => getEditComment(e, p.id)}
                            className="first-icon icon pp-icon"

                          >
                            <EditIcon className="singlePostIcon" />
                          </div>
                          <div
                            onClick={e => deleteComment(e, p.id)}
                            className="last-icon icon pp-icon"
                          >
                            <DeleteOutlineIcon className="singlePostIcon" />

                          </div>
                          <div
                            onClick={handleWantComment}
                            className="first-icon icon comment-icon pp-icon"
                          >
                            <CommentIcon className="singlePostIcon" />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <form className="edit-comment" id={p.id} style={{ display: 'none' }}>
                    <textarea className='edit-comment-box' onChange={handleEditedComment} defaultValue={p.body}></textarea>
                    <button className='SF-home-btn save' onClick={e => saveCommentEdit(e, p.id)}>Save</button>
                  </form>
                </div>
              );
            })
          ) : (
            <h1 className="nothing-to-show bob">No comments to display!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleForum;
