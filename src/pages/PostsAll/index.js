import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import './style.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReportIcon from '@mui/icons-material/Report';

const PostsAll = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        API.getAllPosts()
            .then(posts => {
                console.log('all posts', posts)
                setPosts(posts)
            })
            .catch(err => {
                console.log(err)
                alert(`There was an error: ${err}`)
            })
    }, [])

    return (
        <div className='all-posts'>
            <h1>All User's Posts</h1>
            <ul>
                {posts.length ?
                    posts.map(post => (
                        <Card sx={{ my:'2rem', minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h4" color="text.secondary" gutterBottom>
                                  
                                    {post.flagged ? <div className="last-icon icon pp-icon">
                                        <ReportIcon className="singlePostIcon" />
                                        <p>This Post has Been Flagged</p>
                                    </div> : null}
                                    {post.title}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    by {post.user.username}
                                </Typography>
                                <Typography variant="body2">
                                   {post.body}
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
                        </Card>
                        // <li>
                        // <h1></h1>
                        // <p>by {post.user.username}</p>
                        // {post.flagged ? <div className="last-icon icon pp-icon">
                        //     <ReportIcon className="singlePostIcon" />
                        //     <p>This Post has Been Flagged</p>
                        //   </div> : null}
                        // </li>
                    )) : null}
            </ul>

        </div>
    )
}

export default PostsAll