import {todolistId1, todolistId2} from "../utils/helpers"


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}
export type FilterValuesType = "all" | "completed" | "active"
export type SortValuesType = 'default' | "A-z" | "Z-a"

const initialState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(l => l.id !== action.payload.todolistId)
        case "ADD-NEW-TODOLIST":
            return [
                ...state,
                {
                    id: action.payload.todolistId,
                    title: action.payload.todolistTitle,
                    filter: "all", sort: "default"
                }
            ]
        case "CHANGE-TODOLIST-TITLE":
            return state.map((l: TodolistType) => l.id === action.payload.todolistId ? {
                ...l,
                title: action.payload.todolistTitle
            } : l)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(l => l.id === action.payload.todolistId ? {...l, filter: action.payload.filter} : l)
        case "CHANGE-TODOLIST-SORT":
            return state.map(l => l.id === action.payload.todolistId ? {...l, sort: action.payload.sort} : l)
        default:
            return state
    }
}

type ActionsType =
    RemoveTodolistType
    | AddNewTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | ChangeTodolistSortType
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type AddNewTodolistType = ReturnType<typeof addNewTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistSortType = ReturnType<typeof changeTodolistSortAC>

export const removeTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", payload: {todolistId}} as const)
export const addNewTodolistAC = (todolistId: string, todolistTitle: string) => (
    {type: "ADD-NEW-TODOLIST", payload: {todolistId, todolistTitle}} as const
)
export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string) => (
    {type: "CHANGE-TODOLIST-TITLE", payload: {todolistId, todolistTitle}} as const
)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => (
    {type: "CHANGE-TODOLIST-FILTER", payload: {todolistId, filter}} as const
)
export const changeTodolistSortAC = (todolistId: string, sort: SortValuesType) => (
    {type: "CHANGE-TODOLIST-SORT", payload: {todolistId, sort}} as const
)