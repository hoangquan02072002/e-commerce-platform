import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
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
  localStorage.setItem("cartItems", JSON.stringify(items));
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
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartItems(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartItems(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export default cartSlice.reducer;
