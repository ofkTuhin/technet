import { configureStore } from '@reduxjs/toolkit';
import cartRducer from './features/cart/cartSlice';
import productReducer from './features/product/productSlice';
// ...

export const store = configureStore({
  reducer: {
    cart: cartRducer,
    product: productReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
