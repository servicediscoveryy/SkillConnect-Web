import AppRoutes from "./routes/route";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="">
        <NavBar />
      </div>
      <div className="container mx-auto">
        <AppRoutes />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
