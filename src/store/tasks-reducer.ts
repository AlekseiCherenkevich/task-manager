import {v1} from "uuid";

export type TasksType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}

type ActionsType = AddNewTask

type AddNewTask = ReturnType<typeof addNewTask>


export const tasksReducer  = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            return {...state, [action.payload.todolistId]: [{taskId: action.payload.taskId, taskTitle: action.payload.taskTitle, isDone: false}, ...state[action.payload.todolistId]]}
        default: return state
    }


}

export const addNewTask = (todolistId: string, taskTitle: string) => (
    {type: 'ADD-NEW-TASK', payload: {todolistId, taskTitle, taskId: v1()}}as const)