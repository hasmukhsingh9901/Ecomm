import { Coupon } from "../models/coupon.model.js";

const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.params._id,
      isActive: true,
    });
    res.json(coupon || null);
  } catch (error) {
    console.log("Error in getCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const validateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({
      code: req.body.code,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ message: "Coupon expired" });
    }

    res.json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("Error in validateCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const couponController = { getCoupon, validateCoupon };
