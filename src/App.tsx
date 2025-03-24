import AppRoutes from "./routes/route";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/user.context";
import { useEffect } from "react";
import api from "./requests/axiosConfig/api";

function App() {
  const { setUser } = useAuth();

  const fetchUser = async () => {
    const response = await api.get("/auth/profile", { withCredentials: true });
    setUser(response.data.profile);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Toaster />

      <div className="">
        <NavBar />
      </div>
      <div className="container mx-auto px-2">
        <AppRoutes />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
