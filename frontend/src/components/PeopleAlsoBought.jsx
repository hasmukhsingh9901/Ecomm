import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";

import axiosInstance from "../lib/axios";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Start with loading state as true

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.get("/products/recommended");
        
        
        // Ensure that res.data is an array before setting it
        if (Array.isArray(res.data)) {
          setRecommendations(res.data);
        } else {
          setRecommendations([]); // Handle non-array responses
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching recommendations");
      } finally {
        setIsLoading(false); // Set loading to false after the request
      }
    };
    fetchRecommendations();
  }, []);

  // Render loading spinner if data is still being fetched
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-col-3">
        {recommendations.length > 0 ? (
          recommendations.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
