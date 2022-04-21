import { React, useState } from "react";
import "./style.css";
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';


const PostSingle = (props) => {

  return (

    <div className={props.className} key={props.id} id={props.id} onClick={() => props.getSinglePost() ? props.getSinglePost(props.id) : null}>
      <h1 className="singlePostTitle">{props.title}</h1>
      <div className="singlePostInfo">
        <div className="singlePostEdit">

          <span className="singlePostAuthor">Author: <b>{props.author}</b>{" "}</span>
          <span className="singlePostAuthor">{props.createdAt}</span>
        </div>

        <p className="singlePostBody-p">
          {props.body}
        </p>
        <div className='post-icon-box'>
        {/* <Tooltip title={props.likeText} placement="top-end" arrow></Tooltip> */}
          <div
            className="last-icon icon comment-icon post-icon"
          >
            <FavoriteIcon className="singlePostIcon" />

            <p>{props.likeCount} Likes</p></div>

          <div
            className="last-icon icon comment-icon post-icon"
          >
            <CommentIcon className="singlePostIcon" />
            <p>{props.comments ? props.comments.length : '0'} Comments</p></div>
        </div>
      </div>
    </div>




  );
};

export default PostSingle;
