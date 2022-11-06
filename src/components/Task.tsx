import React, {ChangeEvent} from "react";

type TaskPropsType = {
    todoListIdx: number
    taskTitle: string
    taskID: string
    isDone: boolean
    removeTask: (todoListIdx: number, taskID: string) => void
    changeTaskStatus: (todoListIdx: number, taskID: string, status: boolean) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const {todoListIdx, taskTitle, taskID, isDone, removeTask, changeTaskStatus} = props

    const onClickRemoveTaskHandler = () => {
        removeTask(todoListIdx, taskID)
    }
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListIdx, taskID, e.currentTarget.checked)
    }

    return <li key={taskID} className={isDone ? 'completedTask' : ''}>
        <input
            type="checkbox"
            checked={isDone}
            onChange={onChangeTaskStatusHandler}
        />
        <span>{taskTitle}</span>
        <button onClick={onClickRemoveTaskHandler}>-</button>
    </li>
}