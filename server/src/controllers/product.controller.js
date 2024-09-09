import cloudinary from "../lib/cloudinary.js";
import { Product } from "../models/product.model.js";

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find().lean().exec();
    res.json(products);
  } catch (error) { }
};

const featuredProduct = async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }, null, {
      lean: true,
    }).exec();
    if (!featuredProducts)
      return res.status(404).json({ message: "Not found" });

    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const createProduct = async (req, res, next) => {
  console.log("Inside createProduct function");
  try {
    const { name, price, image, category, isFeatured,description } = req.body;

    let imageUrl = image; // Default to the provided image URL

  
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    // Create a new product in the database
    const product = await Product.create({
      name,
      price,
      image: imageUrl,
      category,
      isFeatured,
      description
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRecommendedProduct = async (req, res, next) => {
  try {
    const product = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          description: 1,
        },
      },
      {
        $limit: 3,
      },
      {
        $addFields: {
          isFeatured: true,
        },
      },
    ]);

    res.json(product);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Toggle the featured status of a product
 * @param {string} req.params.id - product id
 * @return {object} - updated product
 */
const toggleFeaturedProduct = async (req, res, next) => {
  try {
    const update = { isFeatured: { $not: "$isFeatured" } };
    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const productControllers = {
  getAllProduct,
  featuredProduct,
  createProduct,
  deleteProduct,
  getRecommendedProduct,
  getProductsByCategory,
  toggleFeaturedProduct,
};
