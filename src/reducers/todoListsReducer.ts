import {FilterValuesType, SortValuesType, TodoListType} from "../App";
import {checkLocalStorage} from "../utils/helpers";


const initialState: TodoListType[] = checkLocalStorage('todoLists')

export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case "ADD_NEW_TODO_LIST":
            return (
                [...state, {
                    id: action.payload.newTodoID,
                    title: action.payload.todoTitle,
                    filter: "all",
                    sort: "default"
                }])
        case "CHANGE_SORT_VALUE":
            return state.map(tl => tl.id === action.payload.todoListID ? {...tl, sort: action.payload.sort} : tl)
        case "CHANGE_FILTER_VALUE":
            return state.map(tl=>tl.id===action.payload.todoListID?{...tl,filter:action.payload.filterValue}:tl)
        case "CHANGE_TODO_TITLE_VALUE":
            return state.map(tl=>tl.id===action.payload.todoListID?{...tl, title:action.payload.title}:tl)
        case "REMOVE_TODO_LIST":
            return state.filter(tl=>tl.id!==action.payload.todoListID)
        default: return state
    }
}

type ActionsType = AddNewTodoListType | ChangeSortValueType | ChangeFilterValueType | ChangeTodoTitleValueType | RemoveTodoListType
type AddNewTodoListType = ReturnType<typeof addNewTodoListAC>
type ChangeSortValueType = ReturnType<typeof changeSortValueAC>
type ChangeFilterValueType = ReturnType<typeof changeFilterValueAC>
type ChangeTodoTitleValueType = ReturnType<typeof changeTodoTitleValueAC>
type RemoveTodoListType = ReturnType<typeof removeTodoListAC>

export const addNewTodoListAC = (todoTitle: string, newTodoID: string) => (
    {type: "ADD_NEW_TODO_LIST", payload: {todoTitle, newTodoID}} as const)
export const changeSortValueAC = (todoListID: string, sort: SortValuesType) => (
    {type: "CHANGE_SORT_VALUE", payload: {todoListID, sort}} as const)
export const changeFilterValueAC = (todoListID: string, filterValue: FilterValuesType) => (
    {type: "CHANGE_FILTER_VALUE", payload: {todoListID, filterValue}} as const)
export const changeTodoTitleValueAC = (todoListID: string, title: string) => (
    {type: "CHANGE_TODO_TITLE_VALUE", payload: {todoListID, title}} as const)
export const removeTodoListAC = (todoListID: string) => (
    {type: "REMOVE_TODO_LIST", payload: {todoListID}} as const)