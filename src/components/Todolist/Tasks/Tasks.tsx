import {TaskType} from "../../../store/tasks-reducer";
import React from "react";
import {Task} from "./Task/Task";

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => () => void
    changeTaskStatus: (taskId: string) => (taskStatus: boolean) => void
    changeTaskTitle: (taskId: string) => (taskTitle: string) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
    return <div>
        {props.tasks.map(t => {
            return <Task key={t.id}
                         taskTitle={t.title}
                         isDone={t.isDone}
                         removeTask={props.removeTask(t.id)}
                         changeTaskStatus={props.changeTaskStatus(t.id)}
                         changeTaskTitle={props.changeTaskTitle(t.id)}
            />
        })}
    </div>
}