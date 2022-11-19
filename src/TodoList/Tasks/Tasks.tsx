import React, {ChangeEvent} from "react";
import {Task} from "./Task/Task";
import {TaskType} from "../../App";

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string) => (taskTitle: string) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
    const {tasks, removeTask, changeTaskStatus, changeTaskTitle} = props
    return <div>
        {tasks.map(t => {
            const onRemoveTaskHandler = () => removeTask(t.id)
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)

            return <Task key={t.id}
                         title={t.title}
                         isDone={t.isDone}
                         onRemoveTaskHandler={onRemoveTaskHandler}
                         onChangeTaskStatus={onChangeTaskStatus}
                         changeTaskTitle={changeTaskTitle(t.id)}
            />
        })}
    </div>
}