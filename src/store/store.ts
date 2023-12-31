import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import themeReducer from  './themeSlice';
import authReducer from "./authSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure your Redux store
export const store = configureStore({
  reducer: persistedReducer,
  // Use THe Default MiddleWare
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // Disable serializable check middleware
    serializableCheck: false, 
  }),
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // 


// Create a persistor object to persist the store
export const persistor = persistStore(store);
