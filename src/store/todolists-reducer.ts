import { todolistId1, todolistId2 } from "../utils/helpers"


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}
type FilterValuesType = "all" | "completed" | "active"
type SortValuesType = 'default' | "A-z" | "Z-a"

const initialState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(l=>l.id!==action.payload.todolistId)
        default: return state
    }
}

type ActionsType = RemoveTodolist
type RemoveTodolist = ReturnType<typeof removeTodolistAC>

const removeTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", payload: {todolistId}} as const)