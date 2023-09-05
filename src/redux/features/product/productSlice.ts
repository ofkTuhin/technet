import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFilter {
  status: boolean;
  priceRange: number;
}

const initialState: IFilter = {
  status: false,
  priceRange: 150,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    filterProductByStatus: (state) => {
      state.status = !state.status;
    },
    filterProductByPrice: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});
export const { filterProductByPrice, filterProductByStatus } =
  productSlice.actions;

export default productSlice.reducer;
