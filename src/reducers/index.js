import { combineReducers } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import incomesExpensesSlice from './incomesExpensesSlice'

const rootReducer = combineReducers({
  counter: counterSlice,
  incomesExpenses: incomesExpensesSlice,
})

export default rootReducer
