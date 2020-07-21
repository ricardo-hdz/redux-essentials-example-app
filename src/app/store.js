import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer: {
    posts: postReducer,
    users: usersSlice,
    notifications: notificationsReducer
  }
})
