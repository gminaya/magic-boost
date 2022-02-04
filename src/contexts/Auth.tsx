import React, { useContext, useState, useEffect } from 'react';
import { getSupabaseClient } from 'db/DatabaseClient';

const AuthContext = React.createContext<any>(!null);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: any
}
export function AuthProvider(props: AuthProviderProps) {
  const supabase = getSupabaseClient();

  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<any>();

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signUp: (data: any) => supabase.auth.signUp(data),
    signIn: (data: any) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
