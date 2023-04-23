import {React, useState} from 'react';
import { useParams, useRoutes, Link } from 'react-router-dom';
import { supabase } from '../client';
import './Details.css';
import Edit from '../assets/edit-box-icon.svg';
import Delete from '../assets/delete-icon.svg';
import Like from '../assets/like-icon.svg';

const Details = ({data}) => {
    const id2 = useParams().id;
    const [post, setPost] = useState(data.filter(item => item.id == id2)[0]);
    const [count, setCount] = useState(post.likes);

    const updateComments = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .upsert({comments: post.comments})
            .eq('id', id2);
        window.location = "/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updateCount = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({likes: count + 1})
            .eq('id', id2)
        window.location = "/";
    
        setCount((count) => count + 1);
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id2);
        window.location = "/";
    }

    var d = new Date(post.created_at).toLocaleDateString();
    var t = new Date(post.created_at).toLocaleTimeString();
    return (
        <div className="post">
            <div className="post-time">Created {d} {t}</div>
            <h3 className="post-title">{post.title}</h3>
            <div className="post-content">{post.content}</div>
            <img className="post-image" src={post.image}></img>
            <div className="functions-panel">
                <div className="post-like-container">
                    <input className="postLikeButton" type="image" onClick={updateCount} src={Like} />
                    <div className="postLikeCount">{post.likes} likes</div>
                </div>
                <div>
                    <Link to={'edit'}><img className="editButton" alt="edit" src={Edit}/></Link>
                    <Link to={-1}><img className="deleteButton" alt="delete" src={Delete} onClick={deletePost}/></Link>
                </div>
            </div>
            {/* <div className="comments-box">{post.comments}</div>
            <div className="comments">
                <form className="comments-form">
                    <label>New Comment</label><br/>
                    <input className="comments-input" type="text" id="comments" name="comments" value={post.comments} onChange={handleChange}/><br/>
                    <input type="submit" value="Submit" onClick={updateComments}/>
                </form>
            </div> */}
            
        </div>

    )
}

export default Details