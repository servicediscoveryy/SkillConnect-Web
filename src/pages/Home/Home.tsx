import ServicesList from "../../components/Home/ServicesCard";
import CategoryWiseServices from "../../components/Home/CategoryWiseServices";
import PopularArea from "../../components/Home/PopularArea";
import Category from "../../components/Home/Category";
import Banner from "../../components/Home/Banner";
import TopServices from "../../components/Home/TopServices";
import useFetchData from "../../hooks/useFetchData";
import CircularLoader from "../../components/CircularLoader";
import {
  CategoryType,
  CategoryWiseServicesProps,
  ImageRatingData,
  ServiceData,
} from "../../constant/types";

const Home = () => {
  const { data: categoryData, loading: categoryLoading } =
    useFetchData<CategoryType[]>("/category");

  const { data: topServices, loading: topServicesLoading } =
    useFetchData<ServiceData[]>("/services/top");

  const { data: popularAreas, loading: popularAreasLoading } = useFetchData<
    ImageRatingData[]
  >("/services/top?location=mumbai");

  const { data: categoryWiseServices, loading: categoryWiseServicesLoading } =
    useFetchData<CategoryWiseServicesProps[]>(
      "/services/categroy-wise-services"
    );

  const loading =
    categoryLoading ||
    topServicesLoading ||
    popularAreasLoading ||
    categoryWiseServicesLoading;

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="">
      <Category data={categoryData} />
      <Banner />
      <div>Recommendation</div>
      <TopServices data={topServices} />
      <PopularArea data={popularAreas} />
      {/* @ts-expect-error */}
      <CategoryWiseServices data={categoryWiseServices} />
      <ServicesList />
    </div>
  );
};

export default Home;
