import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";

type TaskPropsType = {
    taskTitle: string
    isDone: boolean
    removeTask: () => void
    changeTaskStatus: (taskStatus: boolean) => void
    changeTaskTitle: (taskTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = ({taskTitle, isDone, removeTask, changeTaskStatus, changeTaskTitle}) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(e.currentTarget.checked)

    return <div>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
        <EditableSpan value={taskTitle} callback={changeTaskTitle}/>
        <button onClick={removeTask}>-</button>
    </div>
}