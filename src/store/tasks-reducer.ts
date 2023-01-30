import {Dispatch} from "redux";
import {v1} from "uuid";
import {api, TaskType} from "../api/api";
import {AddNewTodolistType, RemoveTodolistType} from "./todolists-reducer";

export type TasksType = {
    [key: string]: TaskType[]
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
    | RemoveTodolistType
    | SetTasksAC

type AddNewTaskType = ReturnType<typeof addNewTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type SetTasksAC = ReturnType<typeof setTasksAC>


export const tasksReducer = (state: TasksType = {}, action: ActionsType): TasksType => {
    switch (action.type) {
        case "SET-TASKS":
            let localState: TasksType = {[action.payload.todolistId]: []}
            action.payload.tasks.forEach(t=>{
                localState[action.payload.todolistId].push(t)
            })
            return {...state, ...localState}

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

export const addNewTaskAC = (todolistId: string, taskTitle: string) => (
    {type: 'ADD-NEW-TASK', payload: {todolistId, taskTitle, taskId: v1()}} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
)
export const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string) => (
    {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, taskTitle}} as const
)
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => (
    {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', payload:{todolistId, tasks}} as const
}

export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    const res = await api.getTasks(todolistId)
    dispatch(setTasksAC(todolistId, res.items))
}
