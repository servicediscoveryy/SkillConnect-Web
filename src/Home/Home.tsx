import { Toaster } from "react-hot-toast";
import NavBar from "../components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Toaster />
      <NavBar />

      {/* Main Content Area */}
      <div className="w-full bg-[#f2f1f4]">
        <div className="app-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
