import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

function CardDetail() {
    const {id} = useParams();
    const [post, setPost] = useState({
        "username":"", 
        "title":"", 
        "caption":"", 
        "img_url":"", 
        "comments":[]})
    const [commenter, setCommenter] = useState("");
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)
    const [canEdit, setCanEdit] = useState(false);
    // Get post 
    useEffect(() => {
        const fetchPost = async() => {
            const { data } = await supabase
            .from('Posts')
            .select('*')
            .eq("id", id)

            setPost({
                ...data[0],
                comments: data[0].comments || []
              });
        }
        fetchPost();
    }, [id]) 

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
          console.log("user rn is:::::");
          console.log(user);
          if (post.user_id === user.id) {
              setCanEdit(true); // switch edit access
              console.log(canEdit);
          }
    
    
    
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
              console.log("username here is:");
              console.log(data.username);
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





    const handleSubmitComment = async(event) => {
        event.preventDefault();

        if (!(commenter.trim()) || !(comment.trim())) {
            return; /* empty fields */ 
        }
        const newComment = {user: commenter, text: comment}
        const updatedComments = [...(post.comments || []), newComment];

        const { data, error } = await supabase
        .from('Posts')
        .update({comments: updatedComments})
        .eq("id", id)
        .select();

        if (error) {
            console.error("Failed to add comment:", error);
            return;
          }

        /* failing here */
        setPost({
        ...data[0],
        comments: data[0].comments || []
        });
        setComment("")
        setCommenter("")

    }

    useEffect(() => {
        // Check if the user can edit the post
        if (post.user_id && user && post.user_id === user.id) {
          setCanEdit(true); 
        } else {
          setCanEdit(false); 
        }
      }, [post.user_id, user]); // Run  whenever post.user_id or user changes

    return (
        <div className="post-view">
            <div className="pure-post">
                {post.img_url && <img src={post.img_url} className="post-img" />}
                <h2>🤎 {post.likes}</h2>
                <h3>@{post.username}</h3>
                <h2>{post.title}</h2>
                <p>{post.caption}</p>
                <p>{post.created_at}</p>
                <div>
                 {canEdit && (
                      <Link to={`/edit/${id}`}>
                      <button>Edit</button>
                      </Link>
                 )}
                </div>
            </div>
            <div className="comment-section">
                <h2>Post a comment!</h2>
                <div>
                    <form>
                        <h3>Pseudonym</h3>
                        <input
                        type="text"
                        placeholder="Type an anonymous username"
                        value={commenter}
                        onChange={(e) => setCommenter(e.target.value)}/>
                        <h3>Comment</h3>
                        <input
                        type="text"
                        placeholder="Say something..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}/>
                        <button type="submit" onClick={handleSubmitComment}>Comment</button>
                    </form>
                </div>
                <h3>Comments</h3>
                <div className="comment-list">
                    {post.comments && post.comments.length > 0 ?
                    post.comments.map((c, i) => (
                        <div key={i} className="whole-cmt">
                            <h3>@{c.user}:  </h3>
                            <p> {c.text}</p>
                        </div>
                    ))
                    : <p>No comments yet.</p>}
                </div>
            </div>

        </div>
    )
}

export default CardDetail;