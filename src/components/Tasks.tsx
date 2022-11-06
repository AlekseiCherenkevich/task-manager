import React from "react";
import {TaskType} from "../App";
import {Task} from "./Task";

type TasksPropsType = {
    todoListIdx: number
    filteredTasks: TaskType[]
    removeTask: (todoListIdx: number, taskID: string) => void
    changeTaskStatus: (todoListIdx: number, taskID: string, status: boolean) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
    const {todoListIdx, filteredTasks, removeTask, changeTaskStatus} = props
    return <ul>
        {filteredTasks.map(t => {
            return <Task
                todoListIdx={todoListIdx}
                taskTitle={t.taskTitle}
                taskID={t.taskID}
                isDone={t.isDone}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
            />
        })}
    </ul>
}



