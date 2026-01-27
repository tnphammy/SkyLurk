import { supabase } from '../client'
import { useState } from 'react'

function CreatePost() {
    const [post, setPost] = useState({"author":"", "title":"", "caption": "", "img_url":"", "user_id":""});
    function handleChange(event) {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const createPost = async(event) => {
        event.preventDefault();

        // Get user object
        const { data : { user } } = await supabase.auth.getUser();

        await supabase
        .from('Posts')
        .insert({title: post.title, author: post.author, caption: post.caption, img_url: post.img_url, user_id : user.id})
        .select();

        window.location="/view";
    }
    return (
        <div>
            <form>
                <div className="post-input">
                    <h3>Author:</h3>
                    <input
                    type="text"
                    placeholder="Author"
                    name="author" 
                    onChange={handleChange}/>
                    <h3>Title:</h3>
                    <input
                    type="text"
                    placeholder="Title"
                    name="title" 
                    onChange={handleChange}/>
                    <h3>Caption:</h3>
                    <input
                    type="text"
                    placeholder="Caption (Optional)"
                    name="caption" 
                    onChange={handleChange}/>
                    <h3>Image:</h3>
                    <input
                    type="text"
                    placeholder="Paste Image URL"
                    name="img_url"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit" value="Submit" onClick={createPost}>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;