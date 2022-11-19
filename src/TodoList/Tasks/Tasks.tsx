import React, {ChangeEvent} from "react";
import {Task} from "./Task/Task";
import {TaskType} from "../../App";

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const Tasks: React.FC<TasksPropsType> = ({tasks, removeTask, changeTaskStatus}) => {
    return <ul>
        {tasks.map(t => {
            const onRemoveTaskHandler = () => removeTask(t.id)
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)

            return <Task key={t.id}
                         title={t.title}
                         isDone={t.isDone}
                         onRemoveTaskHandler={onRemoveTaskHandler}
                         onChangeTaskStatus={onChangeTaskStatus}
            />
        })}
    </ul>
}