import {v1} from "uuid";
import {todolistId1, todolistId2} from "../utils/helpers";
import {AddNewTodolistType, RemoveTodolistType} from "./todolists-reducer";


export type TasksType = {
    [key: string]: TaskType[]
}
type TaskType = {
    id: string
    title: string
    isDone: true
}

const initialState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

const checkLocalStorage = () => {
    const localStorageData = localStorage.getItem('tasks')
    return localStorageData
        ? JSON.parse(localStorageData)
        : initialState
}

type ActionsType =
    RemoveTaskType
    | AddNewTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddNewTodolistType
    | RemoveTodolistType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddNewTaskType = ReturnType<typeof addNewTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export const tasksReducer = (state: TasksType = checkLocalStorage(), action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-NEW-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.taskTitle,
                    isDone: false
                }, ...state[action.payload.todolistId]]
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
                    isDone: action.payload.taskStatus
                } : t)
            }
        case "ADD-NEW-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        default:
            return state
    }
}


export const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: "REMOVE-TASK", payload: {todolistId, taskId}} as const
)
export const addNewTaskAC = (todolistId: string, taskTitle: string) => (
    {type: "ADD-NEW-TASK", payload: {todolistId, taskTitle}} as const
)
export const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string) => (
    {type: "CHANGE-TASK-TITLE", payload: {todolistId, taskId, taskTitle}} as const
)
export const changeTaskStatusAC = (todolistId: string, taskId: string, taskStatus: boolean) => (
    {type: "CHANGE-TASK-STATUS", payload: {todolistId, taskId, taskStatus}} as const
)
