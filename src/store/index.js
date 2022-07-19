import { configureStore } from '@reduxjs/toolkit';
//持久化管理redux-persist
import { persistReducer } from 'redux-persist'
import collapsedSlice from './features/collapsedSlice';
import  changePadding  from './features/paddingSlice';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// configureStore创建一个redux数据
const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, collapsedSlice)
export default configureStore({
 reducer: {
    collapsed: persistedReducer,
    padding: changePadding
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});