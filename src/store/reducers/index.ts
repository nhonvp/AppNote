import { combineReducers } from "redux"
import authReducer from "features/auth/authSlice"
import noteReducer from "features/note/noteSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    note : noteReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>