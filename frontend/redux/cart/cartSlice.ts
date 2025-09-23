import ActivityTracker from "@/utils/trakerActivity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  category?: {
    id: number;
    name: string;
  };
}

interface CartState {
  items: Product[];
}

const loadCartItems = (): Product[] => {
  if (typeof window !== "undefined") {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      return JSON.parse(savedCartItems);
    }
  }
  return [];
};

const initialState: CartState = {
  items: loadCartItems(),
};

const saveCartItems = (items: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      saveCartItems(state.items);

      // Track activity - fire and forget
      // ActivityTracker.trackAddToCart(
      //   action.payload.id,
      //   action.payload,
      //   action.payload.quantity
      // ).catch(console.error);
    },

    // removeFromCart: (state, action: PayloadAction<number>) => {
    //   const productToRemove = state.items.find(
    //     (item) => item.id === action.payload
    //   );

    //   state.items = state.items.filter((item) => item.id !== action.payload);
    //   saveCartItems(state.items);

    //   // Track removal activity
    //   if (productToRemove) {
    //     ActivityTracker.trackRemoveFromCart(
    //       productToRemove.id,
    //       productToRemove,
    //       productToRemove.quantity
    //     ).catch(console.error);
    //   }
    // },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productToRemove = state.items.find(
        (item) => item.id === action.payload
      );

      // Remove from state first
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartItems(state.items);

      // Track removal activity with complete product data
      if (productToRemove) {
        console.log("🗑️ Tracking removal for product:", productToRemove);
        ActivityTracker.trackRemoveFromCart(
          productToRemove.id,
          {
            name: productToRemove.name,
            price: productToRemove.price,
            category: productToRemove.category,
            image: productToRemove.image,
          },
          productToRemove.quantity
        ).catch((error) => {
          console.error("Failed to track remove from cart:", error);
        });
      } else {
        console.warn(
          "⚠️ Product not found for removal tracking:",
          action.payload
        );
      }
    },
    clearCart: (state) => {
      // Track each item removal
      state.items.forEach((item) => {
        ActivityTracker.trackRemoveFromCart(item.id, item, item.quantity).catch(
          console.error
        );
      });

      state.items = [];
      saveCartItems(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = action.payload.quantity;
        saveCartItems(state.items);

        // Track quantity change
        if (action.payload.quantity > oldQuantity) {
          // Added more items
          ActivityTracker.trackAddToCart(
            item.id,
            item,
            action.payload.quantity - oldQuantity
          ).catch(console.error);
        } else if (action.payload.quantity < oldQuantity) {
          // Removed some items
          ActivityTracker.trackRemoveFromCart(
            item.id,
            item,
            oldQuantity - action.payload.quantity
          ).catch(console.error);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice.reducer;
