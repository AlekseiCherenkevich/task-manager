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
        default: return state
    }
}

type ActionsType = RemoveTaskType

type RemoveTaskType = ReturnType<typeof removeTaskAC>

const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: "REMOVE-TASK", payload: {todolistId, taskId}}
)