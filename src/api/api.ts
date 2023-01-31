import axios, {AxiosResponse} from "axios"
import {TaskPriorities, TaskStatuses} from "../store/tasks-reducer";
import {TodolistType} from "../store/todolists-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '885ef371-8301-4667-84f8-90665c61329c'
    }
})


export const api = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then(res => {
                return res.data
            })
    },
    createTodolist(title: string) {
        return instance.post<string, AxiosResponse<ResponseType<{item: TodolistType}>>>('todo-lists', {title})
            .then(res => res.data)
    },
    removeTodolist(todolistId: string) {
        return instance.delete<string, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<string, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
            .then(res => res.data)
    },
    getTasks(todolistId: string) {
        return instance.get<string, AxiosResponse<FetchTasksResponseType>>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<string, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, task: TaskRequestType) {
        return instance.put<TaskRequestType, AxiosResponse<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {task})
            .then(res => res.data)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    }
}


export type TaskRequestType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
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

type FetchTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}









