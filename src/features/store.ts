import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import thunkMiddleware from 'redux-thunk';

import postReducer from "./post/postSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  posts: postReducer
})


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['blog'], // persist only the blog slice of state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware]
});
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store
