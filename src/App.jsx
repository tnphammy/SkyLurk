import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./client.js";
import Account from "./components/Account.jsx";
import Auth from "./components/Auth.jsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };

    fetchSession();
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? <Auth /> : <Account key={session} session={session} />}
    </div>
  );
}

export default App;
