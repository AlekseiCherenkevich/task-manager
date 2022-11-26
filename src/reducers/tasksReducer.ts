import {TasksType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case "ADD_NEW_TASK": return (
            {...state,
                [action.payload.todoListID]: [
                    {id: v1(), title: action.payload.taskTitle, isDone: false},
                    ...state[action.payload.todoListID]
                ]}
        );
        case "REMOVE_TASK": return (
            {...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.taskID)}
        );
        case "CHANGE_TASK_STATUS": return ({...state, [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)})
    }

    return state
}

type ActionsType = AddNewTask | RemoveTask | ChangeTaskStatus


type AddNewTask = ReturnType<typeof addNewTaskAC>
type RemoveTask = ReturnType<typeof removeTaskAC>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>


export const addNewTaskAC = (todoListID: string, taskTitle: string) => (
    {type: "ADD_NEW_TASK", payload: {todoListID, taskTitle}} as const
)
export const removeTaskAC = (todoListID: string, taskID: string) => (
    {type: "REMOVE_TASK", payload: {todoListID, taskID}} as const
)
export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => (
    {type: "CHANGE_TASK_STATUS", payload: {todoListID, taskID, isDone}} as const
)