import { createContext, useState, ReactNode, useContext } from "react";
import api from "../requests/axiosConfig/api";

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
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  fetchCartCount: () => Promise<void>; // Function to fetch cart count
}

// 3️⃣ Provide a Default Value (Non-null)
const defaultAuthContext: AuthContextType = {
  user: null,
  setUser: () => {}, // Placeholder function
  cartCount: 0,
  setCartCount: () => {}, // Placeholder function
  fetchCartCount: async () => {}, // Placeholder function
};

// 4️⃣ Create Context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// 5️⃣ AuthProvider Component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // 🔥 Function to Fetch Cart Count Only When Needed
  const fetchCartCount = async () => {
    try {
      const response = await api.get("/cart/count", {
        withCredentials: true,
      });
      setCartCount(response.data.totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, cartCount, setCartCount, fetchCartCount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 6️⃣ Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
