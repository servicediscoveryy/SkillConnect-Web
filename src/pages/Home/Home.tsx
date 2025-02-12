import BusinessCard from "../../component/Home/Card"

const Home = () => {
  return (
    <div className="flex  flex-wrap gap-2 mx-auto p-10">
        <BusinessCard/>
        <BusinessCard/>
        <BusinessCard/>
        <BusinessCard/>
        <BusinessCard/>
    </div>
  )
}

export default Home