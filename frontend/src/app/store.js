import { configureStore } from "@reduxjs/toolkit";  

import caftanReducer from "../features/caftanSlice";
import authReducer from "../features/authSlice";   
import categoryReducer from "../features/categorySlice";    
import userReducer from "../features/userSlice";  
import orderReducer from "../features/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    caftan: caftanReducer,
     category: categoryReducer,
     user: userReducer,
     orders: orderReducer,
  
  },
});

export default store;
