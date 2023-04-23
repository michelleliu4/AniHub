import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css'

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.data);
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} created_at={post.created_at} title={post.title} content={post.content} image={post.image} likes={post.likes} comments={post.comments}/>
                ) : <div className="no-posts">{'No Posts Yet'}</div>
            }
        </div>  
    )
}

export default ReadPosts;