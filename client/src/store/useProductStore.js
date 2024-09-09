import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useProductStore = create((set) => ({
  products: [],
  loading: false,

  // Set products to the store
  setProducts: (products) => set({ products }),

  // Create a new product
  createProduct: async (productData) => {
    set({ loading: true }); // Set loading to true before the API call
    try {
      const res = await axiosInstance.post("/products/create", productData); // Make the POST request
      set((prevState) => ({
        products: [...prevState.products, res.data], // Add the new product to the existing product array
        loading: false, // Set loading to false when the product is added
      }));
      toast.success("Product created successfully!"); // Show success notification
    } catch (error) {
      // Error handling
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      toast.error(errorMessage); // Show error message
      set({ loading: false }); // Set loading to false even on failure
    }
  },
  

  // Fetch all products
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to fetch products");
    }
  },

  // Fetch products by category
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/category/${category}`
      );
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to fetch products by category"
      );
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to delete product");
    }
  },

  // Toggle the "isFeatured" status of a product
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.patch(
        `/products/${productId}/toggle-featured`
      );
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Product feature status updated");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to update product feature status"
      );
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Failed to fetch featured products"
      );
    }
  },
}));

export default useProductStore;
