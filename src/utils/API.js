// const BASEURL = "http://localhost:3005"
const BASEURL="https://riseup-back.herokuapp.com/"

const API = {
  getTokenData: (token) => {
    return fetch(`${BASEURL}/users/gettokendata`, {
      headers: {
        'x-access-token': token,
      }
    })
      .then(res => res.json())
  },
  //USER ROUTES
  login: (username, password) => {
    return fetch(`${BASEURL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
  },
  signUp: (newUser) => {
    return fetch(`${BASEURL}/users/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
        email: newUser.email,
        birthday: parseInt(newUser.birthday.split('-').reverse().join('-')),
        zipCode: newUser.zipCode,
      }),
    })
      .then((data) => data.json())
  },
  getUser: (userId) => {
    return fetch(`${BASEURL}/users/${userId}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  editUser: (userId, editedUser) => {
    return fetch(`${BASEURL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        firstName: editedUser?.firstName,
        lastName: editedUser?.lastName,
        username: editedUser?.username,
        password: editedUser?.password,
        role: editedUser?.role,
        email: editedUser?.email,
        birthday: parseInt(editedUser?.birthday.split('-').reverse().join('-')),
        zipCode: editedUser?.zipCode,
      }),
    })
      .then((data) => data.json())
  },
  deleteUser: (userId) => {
    return fetch(`${BASEURL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  followAuthor: (authorId) => {
    return fetch(`${BASEURL}/users/follow/${authorId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }
    })
      .then((data) => data.json())
  },
  unfollowAuthor: (authorId) => {
    return fetch(`${BASEURL}/users/unfollow/${authorId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }
    })
      .then((data) => data.json())
  },
  //Affirmation GET
  getAff: (affId) => {
    return fetch(`${BASEURL}/affirmations/${affId}`, {
      method: "GET",
    })
      .then((response) => response.json())
  },
  //Inspiration GET
  getInsp: (inspId) => {
    return fetch(`${BASEURL}/inspirations/${inspId}`, {
      method: "GET",
    })
      .then((response) => response.json())
  },
  //Motivation GET
  getMotiv: (motivId) => {
    return fetch(`${BASEURL}/motivations/${motivId}`, {
      method: "GET",
    })
      .then((response) => response.json())
  },
  //Philosophy GET
  getPhil: (philId) => {
    return fetch(`${BASEURL}/philosophy/${philId}`, {
      method: "GET",
    })
      .then((response) => response.json())
  },
  //Quote GET
  getQuote: (quoteId) => {
    return fetch(`${BASEURL}/quotes/${quoteId}`, {
      method: "GET",
    })
      .then((response) => response.json())
  },
  //POST ROUTES
  getPost: (postId) => {
    return fetch(`${BASEURL}/posts/${postId}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  getAllPosts: () => {
    return fetch(`${BASEURL}/posts/`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  getTopicPosts: (topic) => {
    return fetch(`${BASEURL}/posts/forum/${topic}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
  },
  getUserPosts: (userId) => {
    return fetch(`${BASEURL}/posts/${userId}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
  },
  savePost: (newPost) => {
    return fetch(`${BASEURL}/posts/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        topic: newPost.topic,
        title: newPost.title,
        body: newPost.body
      }),
    })
      .then((data) => data.json())
  },
  editPost: (postId, editedPost) => {
    // console.log('PUT postId',postId)
    // console.log('PUT editedPost',editedPost)
    return fetch(`${BASEURL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        // topic: editedPost.topic,
        title: editedPost.title,
        body: editedPost.body,
        likeCount: editedPost.likeCount
      }),
    })
      .then((data) => data.json())
  },
  deletePost: (postId) => {
    return fetch(`${BASEURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  likePost: (postId, post) => {
    console.log('into the API request')
    console.log('postId', postId)
    console.log('post', post)
    return fetch(`${BASEURL}/posts/like/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        ...post
      }),
    })
      .then((data) => {
        console.log(data)
        data.json()
      })
  },
  unlikePost: (postId, post) => {
    return fetch(`${BASEURL}/posts/unlike/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ ...post }),
    })
      .then((data) => {
        console.log('can i see this?', data)
        data.json()
      })
  },
  flagPost: (postId, post) => {
    console.log('into the API request')
    console.log('postId', postId)
    console.log('post', post)
    return fetch(`${BASEURL}/posts/flag/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        ...post
      }),
    })
      .then((data) => {
        console.log(data)
        data.json()
      })
  },
  unflagPost: (postId, post) => {
    return fetch(`${BASEURL}/posts/unflag/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ ...post }),
    })
      .then((data) => {
        console.log('can i see this?', data)
        data.json()
      })
  },
  //COMMENT ROUTES
  getComment: (commentId) => {
    return fetch(`${BASEURL}/comments/${commentId}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  saveComment: (postId, newComment) => {
    return fetch(`${BASEURL}/posts/${postId}/comments/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newComment),
    })
      .then((data) => data.json())
  },
  editComment: (id, editedComment) => {
    return fetch(`${BASEURL}/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        // topic: editedPost.topic,
        ...editedComment
      }),
    })
      .then((data) => data.json())
  },
  deleteComment: (commentId) => {
    return fetch(`${BASEURL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
  },
  likeComment: (id, comment) => {
    return fetch(`${BASEURL}/comments/like/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(comment),
    })
      .then((data) => data.json())
  },
  unlikeComment: (id, comment) => {
    return fetch(`${BASEURL}/comments/unlike/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(comment),
    })
      .then((data) => data.json())
  },
}

export default API;