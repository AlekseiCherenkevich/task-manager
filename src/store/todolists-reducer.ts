import {v1} from "uuid"


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}

type FilterValuesType = 'all' | 'completed' | 'active'
type SortValuesType = 'default' | 'A-z' | 'z-A'

type ActionsType = AddNewTodolistType
type AddNewTodolistType = ReturnType<typeof addNewTodolist>

const initialState = [] as TodolistType[]


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-NEW-TODOLIST":
            return [...state, {
                id: action.payload.todolistId,
                title: action.payload.todolistTitle,
                filter: 'all',
                sort: "default"
            }]

        default:
            return state
    }
}

export const addNewTodolist = (todolistTitle: string) => ({
    type: 'ADD-NEW-TODOLIST',
    payload: {todolistTitle, todolistId: v1()}
} as const)