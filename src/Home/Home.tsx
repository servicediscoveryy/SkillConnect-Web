import { Toaster } from "react-hot-toast";
import ServicesList from "./components/ServicesCard";

const Home = () => {
  return (
    <div className="p-6 flex-grow">
    <Toaster />
    <ServicesList />
  </div>
  );
};

export default Home;
