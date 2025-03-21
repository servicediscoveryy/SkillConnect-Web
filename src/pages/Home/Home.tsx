import { Toaster } from "react-hot-toast";
import ServicesList from "../../components/Home/ServicesCard";
import CategoryWiseServices from "../../components/Home/CategoryWiseServices";
import data from "../../constant/data/categoryWiseSerivces.json";
import PopularArea from "../../components/Home/PopularArea";
import Category from "../../components/Home/Category";
import Banner from "../../components/Home/Banner";
import TopServices from "../../components/Home/TopServices";

const Home = () => {
  return (
    <div className="">
      <Toaster />
      <Category />
      <Banner />
      <div>Recommendtaion</div>
      <TopServices />
      <PopularArea />
      <CategoryWiseServices data={data.data} />
      <ServicesList />
    </div>
  );
};

export default Home;
