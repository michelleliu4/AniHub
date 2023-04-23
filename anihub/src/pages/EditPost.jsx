import {React, useState} from 'react';
import { useParams, } from 'react-router-dom';
import { supabase } from '../client'
import './CreatePost.css'

const EditPost = ({data}) => {
    const id2 = useParams().id;
    const [post, setPost] = useState(data.filter(item => item.id == id2)[0]);

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id2); 
        window.location = "/";
    }

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({title: post.title, content: post.content, image: post.image})
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

    return (
        <div>
            <form>
                <label>Title</label><br/>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br/>

                <label>Content</label><br/>
                <textarea id="content" name="content" rows="11" cols="33" value={post.content} onChange={handleChange}></textarea><br/>

                <label>Image URL</label><br/>
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} /><br/>

                <input type="submit" value="Submit" onClick={updatePost}/>
            </form>
        </div>
    )
}

export default EditPost