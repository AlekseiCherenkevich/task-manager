import React from "react";
import {TaskType} from "../App";
import {Task} from "./Task";

type TasksPropsType = {
    todoListIdx: number
    filteredSortedTasks: TaskType[]
    removeTask: (todoListIdx: number, taskID: string) => void
    changeTaskStatus: (todoListIdx: number, taskID: string, status: boolean) => void
    changeTaskTitle: (todoListIdx: number, taskID: string, taskNewTitle: string) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
    const {todoListIdx,
        filteredSortedTasks,
        removeTask,
        changeTaskStatus,
        changeTaskTitle} = props
    return <ul>
        {filteredSortedTasks.map(t => {
            return <Task
                todoListIdx={todoListIdx}
                taskTitle={t.taskTitle}
                taskID={t.taskID}
                isDone={t.isDone}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        })}
    </ul>
}



