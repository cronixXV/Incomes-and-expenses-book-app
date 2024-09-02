import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import loggingMiddleware from './middleware/loggingMiddleware'
import forbiddenActionMiddleware from './middleware/forbiddenActionMiddleware'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...(process.env.NODE_ENV === 'production'
      ? [forbiddenActionMiddleware]
      : [loggingMiddleware, forbiddenActionMiddleware]),
  ],
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
