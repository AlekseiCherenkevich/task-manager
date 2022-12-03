import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todoListsReducer} from "../reducers/todoListsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>
export const  store = createStore(rootReducer)

export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector

//@ts-ignore
window.store = store