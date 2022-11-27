import {SortValuesType, TodoListType} from "../App";


export const todoListsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
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
        default:
            throw new Error('Action not supported')
    }
}

type ActionsType = AddNewTodoListType | ChangeSortValueType
type AddNewTodoListType = ReturnType<typeof addNewTodoListAC>
type ChangeSortValueType = ReturnType<typeof changeSortValueAC>

export const addNewTodoListAC = (todoTitle: string, newTodoID: string) => (
    {type: "ADD_NEW_TODO_LIST", payload: {todoTitle, newTodoID}} as const)
export const changeSortValueAC = (todoListID: string, sort: SortValuesType) => (
    {type: "CHANGE_SORT_VALUE", payload: {todoListID, sort}} as const)