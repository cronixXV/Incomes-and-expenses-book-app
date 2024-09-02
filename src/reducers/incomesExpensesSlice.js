import { createSlice } from '@reduxjs/toolkit'

const incomesExpensesSlice = createSlice({
  name: 'incomesExpenses',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true
      state.error = null
    },
    fetchDataSuccess(state, action) {
      // console.info(action)
      state.loading = false
      state.data = Array.isArray(action.payload)
        ? action.payload
        : [...state.data, action.payload]
    },
    fetchDataFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchDataStart, fetchDataSuccess, fetchDataFail } =
  incomesExpensesSlice.actions

export default incomesExpensesSlice.reducer

// Actions
export const fetchIncomesExpenses = () => async (dispatch) => {
  dispatch(fetchDataStart())
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/incomes_expenses`
    )
    const data = await response.json()
    dispatch(fetchDataSuccess(data))
  } catch (error) {
    dispatch(fetchDataFail(error.message))
  }
}

// One Item
export const fetchIncomesExpensesById = (id) => async (dispatch, getState) => {
  const { data } = getState().incomesExpenses
  const item = data.find((item) => item.id === id)

  if (item) {
    return
  }

  dispatch(fetchDataStart())
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/incomes_expenses/${id}`
    )
    const data = await response.json()
    dispatch(fetchDataSuccess(data))
  } catch (error) {
    dispatch(fetchDataFail(error.message))
  }
}
