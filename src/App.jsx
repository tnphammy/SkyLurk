import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./client.js";
import Account from "./components/Account.jsx";
import Auth from "./components/Auth.jsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session from getSession:", session); // Debugging
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session from getSession:", session); // Debugging
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

    if (session) {
      console.log("I was here");
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
