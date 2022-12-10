import React, {ChangeEvent} from 'react';

type TaskPropsType = {
    taskTitle: string
    isDone: boolean
    removeTask: () => void
    changeTaskStatus: (taskStatus: boolean) => void
}

export const Task: React.FC<TaskPropsType> = ({taskTitle, isDone, removeTask, changeTaskStatus}) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(e.currentTarget.checked)

    return <div>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
        <span>{taskTitle}</span>
        <button onClick={removeTask}>-</button>
    </div>
}