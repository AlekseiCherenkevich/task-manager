import {TodoListType} from "../App";


export const todoListsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case "ADD_NEW_TODO_LIST": return (
            [...state, {id: action.payload.newTodoID, title: action.payload.todoTitle, filter: "all", sort: "default"}])
        default: throw new Error('Action not supported')
    }
}

type ActionsType = AddNewTodoListType
type AddNewTodoListType = ReturnType<typeof addNewTodoListAC>

export const addNewTodoListAC = (todoTitle: string, newTodoID: string) => ({type: "ADD_NEW_TODO_LIST", payload: {todoTitle, newTodoID}} as const)