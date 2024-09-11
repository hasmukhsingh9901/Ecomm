import { create } from "zustand";
import axiosStance from "../lib/axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";


 const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,


    getMyCoupons: async () => {
        try {
            const response = await axiosStance.get('/coupons');
            set({ coupon: response.data });
        } catch (error) {
            console.log(error);
        }
    },
    applyCoupon: async (code) => {
        try {
            const response = await axiosStance.get(`/coupons/validate`, { code });
            set({ coupon: response.data, isCouponApplied: true });
            get().calculateTotals()
            toast.success("Coupon Applied Successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    ,

    removeCoupon: () => {
        set({ coupon: null, isCouponApplied: false });
        get().calculateTotals()
        toast.success("Coupon removed")
    },
    getCartItems: async () => {
        try {
            const response = await axiosStance.get('/cart');
            set({ cart: response.data });
            get().calculateTotals()
        } catch (error) {
            console.log(error);
        }
    },
    clearCart: async () => {
        set({ cart: [], coupon: null, total: 0, subtotal: 0 });
    },
    addToCart: async (product) => {
        try {
            await axiosStance.post("/cart", { productId: product._id });

            toast.success("Product added to cart");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem ? prevState.cart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) : [...prevState.cart, { ...product, quantity: 1 }];
                return { cart: newCart };
            })
            get().calculateTotals()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    removefromCart: async (productId) => {
        try {
            await axiosStance.delete(`/cart`,{data:{productId}});
            set((prevState)=>({
                cart:prevState.cart.filter((item)=>item._id !== productId)
            }))
            get().calculateTotals()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateQuantity: async (productId, quantity) => {
        if(quantity===0){
            get().removefromCart(productId);
            return
        }

        await axiosInstance.put(`/cart/${productId}`,{quantity});

        set((prevState) => ({
            cart:prevState.cart.map((item)=>(item._id===productId?{...item,quantity}:item)),
        }));
        get().calculateTotals()
    },

    calculateTotals:()=>{
        const {cart,coupon} = get();
        const subtotal = cart.reduce((sum,item)=>sum+item.price * item.quantity,0)
        let total =  subtotal;

        if(coupon){
            const discount = subtotal * (coupon.discountPercentage/100);
            total = subtotal - discount;
        }

        set({subtotal,total})
    }

}))

export default useCartStore