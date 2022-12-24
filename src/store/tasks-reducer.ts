import {v1} from "uuid";

export type TasksType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}

type ActionsType = AddNewTaskType | RemoveTaskType | ChangeTaskTitleType | ChangeTaskStatusType

type AddNewTaskType = ReturnType<typeof addNewTask>
type RemoveTaskType = ReturnType<typeof removeTask>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitle>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>


export const tasksReducer  = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            return {...state, [action.payload.todolistId]: [{taskId: action.payload.taskId, taskTitle: action.payload.taskTitle, isDone: false}, ...state[action.payload.todolistId]]}
        case "REMOVE-TASK":
        return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t=>t.taskId!==action.payload.taskId)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.taskId===action.payload.taskId?{...t, taskTitle: action.payload.taskTitle}:t)}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.taskId===action.payload.taskId?{...t, isDone: action.payload.isDone}:t)}
        default: return state
    }


}

export const addNewTask = (todolistId: string, taskTitle: string) => (
    {type: 'ADD-NEW-TASK', payload: {todolistId, taskTitle, taskId: v1()}}as const)

export const removeTask = (todolistId: string, taskId: string) => (
    {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
)

export const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => (
    {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, taskTitle}} as const
)
export const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean)=>(
    {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const)