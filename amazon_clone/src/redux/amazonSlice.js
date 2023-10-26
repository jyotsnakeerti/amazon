import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  fav:[],
  allProducts: [],
  userInfo: null,
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    
    addTofavorite: (state, action) => {
      const item = state.fav.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.fav.push(action.payload);
      }
    },
    
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    // Delete item from cart
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    // Reset cart to initial state
    resetCart: (state) => {
      state.products = [];
    },

    // User authentication
    setUserInfo:(state,action)=>{
      state.userInfo = action.payload
    },

    userSignOut:(state)=>{
      state.userInfo= null
    },

    deleteFavorite: (state, action) => {
      state.fav = state.fav.filter(
        (item) => item.id !== action.payload
      );
    },
    resetFavoriteData: (state) => {
      state.fav = [];
    },

    setAllProducts: (state,action)=>{
      state.allProducts = action.payload;
    }
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  setUserInfo,
  userSignOut,
  addTofavorite,
  setAllProducts,
  deleteFavorite,
  resetFavoriteData
} = amazonSlice.actions;
export default amazonSlice.reducer;