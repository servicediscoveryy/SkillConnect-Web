import { Link } from "react-router-dom";
import { CategoryType } from "../../constant/types";

interface CategoryProps {
  data: CategoryType[];
}

const Category = ({ data }: CategoryProps) => {
  return (
    <div className="flex justify-center overflow-x-auto p-2 hide-scrollbar bg-white my-2 ">
      {data?.map((category: CategoryType) => (
        <Link
          to={`/category/${category?.category}`}
          key={category._id}
          className="flex flex-col items-center text-center p-2  min-w-[100px] cursor-pointer hover:scale-105 transition-transform "
        >
          <img
            src={
              category?.image ||
              "https://static.vecteezy.com/system/resources/previews/006/137/360/non_2x/painter-paint-the-wall-free-vector.jpg"
            }
            alt={category?.category}
            className="w-16 h-16 object-contain rounded-full"
          />
          <p className="text font-medium mt-2">{category?.category}</p>
        </Link>
      ))}
    </div>
  );
};

export default Category;
