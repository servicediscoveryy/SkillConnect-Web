import { Link } from "react-router-dom";
import categoryData from "../../constant/data/category.json";

const Category = () => {
  return (
    <div className="flex justify-center overflow-x-auto gap-4 p-2 hide-scrollbar bg-white my-2">
      {categoryData.data.map((category, index) => (
        <Link
          to={`/category/${category.category}`}
          key={index}
          className="flex flex-col items-center text-center p-2 min-w-[100px] cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={category.image}
            alt={category.category}
            className="w-16 h-16 object-contain rounded-full"
          />
          <p className="text font-medium mt-2">{category.category}</p>
        </Link>
      ))}
    </div>
  );
};

export default Category;
