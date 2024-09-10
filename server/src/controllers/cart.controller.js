import { Product } from "../models/product.model.js";

const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $in: req.user.cartItems.map((item) => item.id) },
    });

    // Add quantity to each product based on cartItems
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find((cartItem) =>
        cartItem.id.equals(product._id)
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId)
    }

    await user.save();
    res.json(user.cartItems)
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove All From Cart (or a specific product)
const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = []; // Clear the cart
    } else {
      // Remove specific product from cart
     user.cartItems = user.cartItems.filter(
      (item) => item.id !== productId
     )
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Quantity in Cart
const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) =>
      item.id === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        // Remove product from cart if quantity is 0
        user.cartItems = user.cartItems.filter(
          (item) => item.id !== productId
        );
      } else {
        // Update the quantity
        existingItem.quantity = quantity;
      }

      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const cartController = {
  addToCart,
  removeAllFromCart,
  updateQuantity,
  getCartProducts,
};
