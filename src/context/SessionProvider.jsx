import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../client";

// Create the context
const SessionContext = createContext();

// Provider:
export const SessionProvider = ({children}) => {
    const [session, getSession] = useState(null);

    useEffect(() => {
        // Fetch the session when the app loads
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
        });
    
        // Listen for session changes
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
    
        return () => subscription.unsubscribe();
      }, []);
}

// Make custom hook for later use
export const useSession = () => {
    return useContext(SessionContext);
  };