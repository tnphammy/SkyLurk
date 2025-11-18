import Card from '../elements/Card.jsx'
import SearchBar from '../components/SearchBar.jsx';
import { Link } from 'react-router'
import { supabase } from '../client'
import { useState, useEffect } from 'react'

function ViewPosts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const fetchPosts = async() => {
            const { data } = await supabase
            .from('Posts')
            .select('*')
            .order("created_at", { ascending: false });

            setPosts(data);
        }
        fetchPosts()
    }, [props]);

    return (
        <div className="whole-page">
            <div className="feed-functions">
                <div className="sort-container">
                    <label htmlFor="sort-by">Sort by: </label>
                    <select>
                        <option>Latest</option>
                        <option>Most Popular</option>
                    </select>
                </div>
                <div className="search-bar">
                    <SearchBar />
                </div>
            </div>
            <div className="feed-posts">
            {posts && posts.length > 0 ? (
                [...posts].map((post, index) => (
                    <Link to={`/view/${post.id}`} key={post.id}>
                        <Card 
                        key = {post.id}
                        author = {post.author}
                        created_at = {post.created_at}
                        title = {post.title}
                        img_url = {post.img_url}
                        likes = {post.likes} />
                    </Link>
                ))
            )
            : "No posts yet."}

            </div>
        </div>
      )
}

  
export default ViewPosts;