import {v1} from "uuid"


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
    // filter: FilterValuesType
    // sort: SortValuesType
}

export type TodolistEntityType = TodolistType & {filter: FilterValuesType, sort: SortValuesType}

export type FilterValuesType = 'all' | 'completed' | 'active'
export type SortValuesType = 'default' | 'A-z' | 'z-A'

type ActionsType = AddNewTodolistType | RemoveTodolist | ChangeTodolistTitle | ChangeTodolistFilter | ChangeTodolistSort
export type AddNewTodolistType = ReturnType<typeof addNewTodolist>
export type RemoveTodolist = ReturnType<typeof removeTodolist>
type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitle>
type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilter>
type ChangeTodolistSort = ReturnType<typeof changeTodolistSort>


const checkLocalStorage = () => {
    const state = localStorage.getItem('todolists')
    if (state) {
        return JSON.parse(state)
    } else {
        return [] as TodolistEntityType[]
    }
}

export const todolistsReducer = (state: TodolistEntityType[] = checkLocalStorage(), action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case "ADD-NEW-TODOLIST":
            const newTodolist: TodolistEntityType = {
                id: action.payload.todolistId,
                title: action.payload.todolistTitle,
                filter: 'all',
                sort: "default",
                addedDate: '',
                order: 0
            }
            return state.length ? [...state, newTodolist] : [newTodolist]
        case "REMOVE-TODOLIST":
            return state.length ? state.filter(tl => tl.id !== action.payload.todolistId) : state
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.todolistTitle
            } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case "CHANGE-TODOLIST-SORT":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, sort: action.payload.sort} : tl)
        default:
            return state
    }
}

export const addNewTodolist = (todolistTitle: string) => ({
    type: 'ADD-NEW-TODOLIST',
    payload: {todolistTitle, todolistId: v1()}
} as const)
export const removeTodolist = (todolistId: string) => (
    {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const)
export const changeTodolistTitle = (todolistId: string, todolistTitle: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, todolistTitle}} as const)
export const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}} as const)
export const changeTodolistSort = (todolistId: string, sort: SortValuesType) => (
    {type: 'CHANGE-TODOLIST-SORT', payload: {todolistId, sort}} as const)