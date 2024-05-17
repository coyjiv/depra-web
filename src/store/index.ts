import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './testSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})