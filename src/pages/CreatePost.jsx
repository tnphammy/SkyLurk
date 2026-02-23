import { supabase } from '../client'
import { useState } from 'react'
import { useEffect } from 'react'


function CreatePost() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)
    const [post, setPost] = useState({"username":"", "title":"", "caption": "", "img_url":"", "user_id":""});

    // Get session
    const [session, setSession] = useState(null);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
  
      return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        let ignore = false
        async function getProfile() {
          setLoading(true)
          // Get user object
          const user = session?.user;

          // SET USER
          setUser(user);
    
    
    
          let { data, error } = await supabase
          .from('profiles')
          .select('*')    
          .eq('id', user.id)
          .single()
    
          if (!ignore) {
            if (error) {
              console.warn(error)
            } else if (data) {
              setUsername(data.username);
            }
          }
    
          setLoading(false)
        }
        
        if (session) {
            getProfile();
        }
    
        return () => {
          ignore = true
        }
      }, [session])

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
        console.log(session);
        event.preventDefault();

        console.log("username and id is still...")
        console.log(username);
        console.log(user.id)

        await supabase
        .from('Posts')
        .insert({title: post.title, username: username, caption: post.caption, img_url: post.img_url, user_id : user.id})
        .select();

        window.location="/view";
    }
    return (
        <div>
            <form>
                <div className="post-input">
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