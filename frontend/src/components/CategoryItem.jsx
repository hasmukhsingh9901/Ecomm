import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group">
      <Link to={`/category` + category.href}>
        <div className="w-full h-full cursor-pointer relative">
          <div className="absolute inset-0 bg-black opacity-40 z-10" />

          <img
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 aspect-square"
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl">{category.name}</h3>
            <p className="text-gray-200 text-sm">
                Explore {category.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
