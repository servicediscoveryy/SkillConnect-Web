import { createContext, useState, ReactNode, useContext } from "react";

// 1️⃣ Define User Type
interface User {
  email: string;
  role: string;
  userId: string;
}

// 2️⃣ Define Context Type
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// 3️⃣ Provide a Default Value (Non-null)
const defaultAuthContext: AuthContextType = {
  user: null,
  setUser: () => {}, // Placeholder function to avoid undefined errors
};

// 4️⃣ Create Context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// 5️⃣ AuthProvider Component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6️⃣ Custom Hook to Use AuthContext (Avoids Null Issues)
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
