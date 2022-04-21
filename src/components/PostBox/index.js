import React from 'react';
import './style.css'

const PostBox = props => {

    return (
        <form className="writeForm" >
            <div className="writFormGroup">
                <input className="writeInput writeText NPtitle" name={'title'} onChange={props.handleInputChange} type="text" placeholder={props.titleContent ? null : "Give it a title..."} defaultValue={props.oldTitle} id="post-title-input"></input>
                <textarea name={'body'} placeholder={props.boxContent ? null : "Tell your story..."} defaultValue={props.boxContent} type="text" onChange={props.handleInputChange} className="writeInput writeText" id="post-body-input"></textarea>
            </div>
        </form>
    )
}

export default PostBox