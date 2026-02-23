import { useState, useEffect } from 'react'
import { supabase } from '../client'

function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)


  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      // Get user object
      console.log("Trying to get userrrr...");
      const user = session?.user;
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
          setAvatarUrl(data.avatar_url);
          console.log("here is url");
          console.log(data.avatar_url);
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
      console.log("I set the user!")
      console.log(user);
    }
  }, [session])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    // Get user object
    const user = session?.user;
    console.log(user);


    const updates = {
      id: user.id,
      email: user.email,
      username: username,
      avatar_url: avatar_url,
      updated_at: user.updated_at,
      created_at: user.created_at
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } 
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <h3>
          You can return and edit this anytime!
        </h3>
      </div>
      <div className="user_editables">
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={session.user.email} disabled />
        <label htmlFor="username">Name:</label>
        <input
          id="username"
          type="text"
          placeholder="What's your name?"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Profile Photo (URL): </label>
      < input
          id="avatar_url"
          type="text"
          placeholder="Paste Image URL"
          required
          value={avatar_url || ''}
          onChange={(e) => setAvatarUrl(e.target.value)}
          />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  )
}

export default Account;