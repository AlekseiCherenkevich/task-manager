import { Dispatch } from "redux"
import {api} from "../api/api";


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodolistEntityType = TodolistType & {filter: FilterValuesType, sort: SortValuesType}

export type FilterValuesType = 'all' | 'completed' | 'active'
export type SortValuesType = 'default' | 'A-z' | 'z-A'

type ActionsType = AddNewTodolistType | RemoveTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType | ChangeTodolistSortType | SetTodolistsType
export type AddNewTodolistType = ReturnType<typeof addNewTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistSortType = ReturnType<typeof changeTodolistSortAC>
type SetTodolistsType = ReturnType<typeof setTodolistsAC>


export const todolistsReducer = (state: TodolistEntityType[] = [], action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl=>({...tl, filter: "all", sort: "default"}))
        case "ADD-NEW-TODOLIST":
            const newTodolist: TodolistEntityType = {
                ...action.payload.todolist,
                filter: 'all',
                sort: "default",
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

export const addNewTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-NEW-TODOLIST',
    payload: {todolist}
} as const)
export const removeTodolistAC = (todolistId: string) => (
    {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const)
export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, todolistTitle}} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}} as const)
export const changeTodolistSortAC = (todolistId: string, sort: SortValuesType) => (
    {type: 'CHANGE-TODOLIST-SORT', payload: {todolistId, sort}} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', payload: {todolists}} as const
}
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    const res = await api.getTodolists()
    dispatch(setTodolistsAC(res))
}
export const createTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    const res = await api.createTodolist(title)
    dispatch(addNewTodolistAC(res.data.item))
}
export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {
    const res = await api.removeTodolist(todolistId)
    if (res.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId))
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    const res = await api.updateTodolist(todolistId, title)
    if (res.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }
}



