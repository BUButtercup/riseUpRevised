import React, { useState, useEffect } from 'react';
import './style.css'
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import API from '../../utils/API';
import useAuth from '../../utils/hooks/useAuth';
import ProfBtnsMod from '../../components/ProfBtnsMod';
import ProfBtnsAdmin from '../../components/ProfBtnsAdmin';
import TodoList from '../../components/Todo/TodoList';



const UserLanding = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [uHomePosts, setUHomePosts] = useState([]);
  const [userAff, setUserAff] = useState("");
  const [following, setFollowing] = useState([])
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roleName = auth.role.toUpperCase();

  useEffect(() => {
    setRole(auth.role);

    API.getUser(auth.userId)
      .then((responseJson) => {
        console.log("=================userData", responseJson);
        setUsername(responseJson.username);
        setUHomePosts(responseJson.Posts);
        setFollowing(responseJson.following)
      })
      .catch((err) => {
        console.log(err);
        alert(`There was an error: ${err}`);
      });

    const randNum = Math.floor(Math.random() * 30 + 1);
    API.getAff(randNum)
      .then((responseJson) => {
        console.log("=================affData", responseJson);
        setUserAff(responseJson.body);
      })
      .catch((err) => {
        console.log(err);
        alert(`There was an error: ${err}`);
      });

  }, []);

  // useEffect(() => {
  //   console.log('following', following)
  // }, [following])


  return (
    <div className="user-home">
      <div className='sup-user-home'>

        <div className="aff-box">
          <h2>Random Ray of Sunshine:</h2>
          <p style={{ fontWeight: "bold", fontSize: "2rem", margin: '0' }}>"{userAff}"</p>
          {/* <p>- {userAffAuth}</p> */}
        </div>

        <div className="user-home-btn-box prof">
          <h2>What would you like to do?</h2>
          <button
            className="btnUseHome"
            onClick={() => navigate("/forums")}
          >
            Visit the Forums
          </button>
          {/* <button className="btnUseHome">Visit ToDos</button>
                    <button className="btnUseHome">Read a Story</button> */}
          {auth.role === "user" ? (
            null
          ) : auth.role === "mod" ? (
            <ProfBtnsMod />
          ) : auth.role === "admin" ? (
            <ProfBtnsAdmin />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )}
        </div>

        <div className="user-post-list">
          <h1 >My Posts</h1>
          {uHomePosts.length ? (
            uHomePosts.map((post) => {
              return (
                <li
                  key={post.id}
                  onClick={() => navigate(`/forums/post/${post.id}`)}
                  className="user-post-title"
                >
                  {' ' + post.title}
                </li>
              );
            })
          ) : (
            <h2 className='post-li'>You don't have any posts</h2>
          )}
        </div>
        {following.length ?
          following.map(user => (<div className="user-post-list">
            <h1 >{user.username}'s Posts</h1>
            {user.Posts.length ? (
              user.Posts.map((post) => {
                return (
                  <li
                    key={post.id}
                    onClick={() => navigate(`/forums/post/${post.id}`)}
                    className="user-post-title"
                  >
                    {' ' + post.title}
                  </li>
                );
              })
            ) : (
              <h2 className='post-li'>{user.username} doesn't have any posts</h2>
            )}
          </div>)) : <div className="user-post-list">
            <h1 >You are not following anyone...</h1></div>}





      </div>
      <div className="sub-user-home">

        {auth.role !== 'user' ? (<div className="user-welcome-box"><h1 className="user-welcome">
          Hello {username}!</h1><h2 className="user-welcome-h2">This is the {roleName} homepage!
          </h2></div>) : <div className="user-welcome-box"><h1 className="user-welcome">
            Hello {username}!</h1><h2 className="user-welcome-h2"> Welcome to your homepage!</h2></div>}



        <div className="checklist">
          <div className="todo-app">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLanding