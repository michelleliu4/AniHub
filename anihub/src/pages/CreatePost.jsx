import { useState, React } from 'react';
import { supabase } from '../client'
import './CreatePost.css'

const CreatePost = () => {
    const [post, setPost] = useState({title: "", content: "", });
    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({title: post.title, content: post.content, image: post.image})
            .select();
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
        <div className="container">
            <form>
                <label>Title</label><br/>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/><br/>

                <label>Content</label><br/>
                <textarea id="content" name="content" rows="11" cols="33" value={post.content} onChange={handleChange}></textarea><br/>

                <label>Image URL</label><br/>
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange}/><br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost