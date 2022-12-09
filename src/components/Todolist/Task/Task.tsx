import React from 'react';

type TaskPropsType = {
    taskTitle: string
    isDone: boolean
    removeTask: () => void
}

export const Task: React.FC<TaskPropsType> = ({taskTitle, isDone, removeTask}) => {

    return <div>
        <input type="checkbox" checked={isDone}/>
        <span>{taskTitle}</span>
        <button onClick={removeTask}>-</button>
    </div>
}