import { combineReducers } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import incomesExpensesSlice from './incomesExpensesSlice'
import authSlice from './authSlice'

const rootReducer = combineReducers({
  counter: counterSlice,
  incomesExpenses: incomesExpensesSlice,
  auth: authSlice,
})

export default rootReducer
