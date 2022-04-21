import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '../features/newsSlice'
import provincesReducer from '../features/posts/province/provinceSlice'

export default configureStore({
  reducer: {
    news: newsReducer,
    provinces: provincesReducer
    //users: usersRre voorbeeld
  
  }
})
