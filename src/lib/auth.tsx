import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  uid: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, uid: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure we have a user; sign in anonymously if needed
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    // Kick off anonymous sign-in if there is no current user
    if (!auth.currentUser) {
      signInAnonymously(auth).catch(() => {
        // ignore; rules may allow unauthenticated
      });
    }
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid: user?.uid ?? null, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


