import categoryData from "../../constant/data/category.json";

const Category = () => {
  return (
    <div className="flex justify-center overflow-x-auto gap-4 p-4 hide-scrollbar bg-white my-2">
      {categoryData.data.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-2 min-w-[100px] cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={category.image}
            alt={category.category}
            className="w-20 h-20 object-contain rounded-full"
          />
          <p className="text font-medium mt-2">{category.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
