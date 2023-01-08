import {v1} from "uuid";
import {AddNewTodolistType, RemoveTodolist} from "./todolists-reducer";

export type TasksType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

type ActionsType =
    AddNewTaskType
    | RemoveTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddNewTodolistType
    | RemoveTodolist

type AddNewTaskType = ReturnType<typeof addNewTask>
type RemoveTaskType = ReturnType<typeof removeTask>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitle>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>


const checkLocalStorage = () => {
    const state = localStorage.getItem('tasks')
    if (state) {
        return JSON.parse(state)
    } else {
        return {} as TasksType
    }
}

export const tasksReducer = (state: TasksType = checkLocalStorage(), action: ActionsType): TasksType => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: action.payload.taskId,
                    title: action.payload.taskTitle,
                    addedDate: '',
                    order: 0,
                    deadline: '',
                    startDate: '',
                    description: '',
                    todoListId: action.payload.todolistId,
                    priority: TaskPriorities.Middle,
                    status: TaskStatuses.New
                }, ...state[action.payload.todolistId]]
            }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.taskTitle
                } : t)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    status: action.payload.status
                } : t)
            }
        case "ADD-NEW-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            delete state[action.payload.todolistId]
            return state
        default:
            return state
    }
}

export const addNewTask = (todolistId: string, taskTitle: string) => (
    {type: 'ADD-NEW-TASK', payload: {todolistId, taskTitle, taskId: v1()}} as const)

export const removeTask = (todolistId: string, taskId: string) => (
    {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
)

export const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => (
    {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, taskTitle}} as const
)
export const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => (
    {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const)