import React from 'react';

type TaskPropsType = {
    taskTitle: string
    isDone: boolean
}

export const Task: React.FC<TaskPropsType> = ({taskTitle, isDone}) => {

    return <div>
        <input type="checkbox" checked={isDone}/>
        <span>{taskTitle}</span>
        <button>-</button>
    </div>
}