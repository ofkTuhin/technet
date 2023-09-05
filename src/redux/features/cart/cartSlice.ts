import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ICart {
  Products: IProduct[];
  total: number;
}

// Define the initial state using that type
const initialState: ICart = {
  Products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.Products.find(
        (item) => item._id === action.payload._id
      );
      if (isExist) {
        isExist.quantity! += 1;
      } else {
        state.Products.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.total + action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.Products.find(
        (item) => item._id === action.payload._id
      );
      if (isExist && isExist.quantity! > 1) {
        isExist.quantity! -= 1;
      } else {
        state.Products = state.Products.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total = state.total - action.payload.price;
    },
    removeFromCard: (state, action: PayloadAction<IProduct>) => {
      state.Products = state.Products.filter(
        (item) => item._id !== action.payload._id
      );
      state.total =
        state.total - action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCard, removeOne } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default cartSlice.reducer;
