import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

function EditPost(props) {
    const {id} = useParams();
    const [post, setPost] = useState({"author":"", "title":"", "caption":"", "img_url":""})

    // Load current post data (so the user doesn't have to rewrite)
    useEffect(() => {
        const fetchPost = async() => {
            const { data } = await supabase
            .from('Posts')
            .select('*')
            .eq("id", id)

            setPost(data[0]);
        }
        fetchPost();
    }, [props])

    function handleChange(event) {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const updatePost = async(event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .update({title: post.title, author: post.author, caption: post.caption, img_url: post.img_url})
        .eq("id", id);

        window.location="/view";
    }

    const deletePost = async(event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .delete()
        .eq("id", id);

        window.location="/view";
    }
    return (
        <div>
            <form>
                <div className="post-input">
                    <h3>Author: </h3>
                    <input
                    type="text"
                    placeholder="Author"
                    name="author" 
                    value={post.author}
                    onChange={handleChange}/>
                    <h3>Title:</h3>
                    <input
                    type="text"
                    placeholder="Title"
                    name="title" 
                    value={post.title}
                    onChange={handleChange}/>
                    <h3>Caption:</h3>
                    <input
                    type="text"
                    placeholder="Caption (Optional)"
                    name="caption"
                    value={post.caption} 
                    onChange={handleChange}/>
                    <h3>Image:</h3>
                    <input
                    type="text"
                    placeholder="Paste Image URL"
                    name="img_url"
                    value={post.img_url}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit" value="Submit" onClick={updatePost}>Update</button>
                    <button onClick={deletePost}>Delete</button>
                </div>
            </form>
        </div>
    )
}
export default EditPost;