import {v1} from "uuid";
import {todolistId1, todolistId2} from "../utils/helpers";


type TasksType = {
    [key: string]: TaskType[]
}
type TaskType = {
    id: string
    title: string
    isDone: true
}

const initialsState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksType = initialsState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t=>t.id!==action.payload.taskId)}
        case "ADD-NEW-TASK":
            return {...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.taskTitle, isDone: false}, ...state[action.payload.todolistId]]}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.taskId?{...t, title: action.payload.taskTitle}: t)}
        default: return state
    }
}

type ActionsType = RemoveTaskType | AddNewTaskType | ChangeTaskTitleType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddNewTaskType = ReturnType<typeof addNewTaskAC>
type ChangeTaskTitleType  = ReturnType<typeof changeTaskTitleAC>

const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: "REMOVE-TASK", payload: {todolistId, taskId}} as const
)
const addNewTaskAC = (todolistId: string, taskTitle: string) => (
    {type: "ADD-NEW-TASK", payload: {todolistId, taskTitle}} as const
)
const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string) => (
    {type: "CHANGE-TASK-TITLE", payload: {todolistId, taskId, taskTitle}} as const
)