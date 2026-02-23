import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./client.js";
import Account from "./components/Account.jsx";
import Auth from "./components/Auth.jsx";
import { Outlet, Link } from 'react-router';

function App() {
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

    if (session) {
      console.log(session);
    }


  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}

export default App;
