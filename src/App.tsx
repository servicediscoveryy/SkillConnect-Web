import AppRoutes from "./routes/route";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {<NavBar />}
        <AppRoutes />

      </div>
        {/* {<Footer />} */}
    </div>
  );
}

export default App;
