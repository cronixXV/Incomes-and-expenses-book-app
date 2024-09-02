import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    plus: (state) => {
      state.count += 1
    },
    minus: (state) => {
      state.count -= 1
    },
    reset: (state) => {
      state.count = counterSlice.getInitialState().count
    },
  },
})

export const { plus, minus, reset } = counterSlice.actions

export default counterSlice.reducer

export function useCounterDispatch() {
  const dispatch = useDispatch()
  return {
    plus: () => dispatch(plus()),
    minus: () => dispatch(minus()),
    reset: () => dispatch(reset()),
  }
}
