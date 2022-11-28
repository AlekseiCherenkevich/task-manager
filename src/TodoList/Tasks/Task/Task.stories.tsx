import React, {ChangeEvent, useState} from 'react';
import {ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskType} from "../../../App";

export default {
    title: 'Task',
    component: Task
} as ComponentMeta<typeof Task>

export const ChangingTask = () => {
    const [task, setTask] = useState<TaskType>({id: '1', title: 'new task', isDone: false})
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => setTask({...task, isDone: e.currentTarget.checked})
    const changeTaskTitle = (title: string) => setTask({...task, title: title})

    return <Task title={task.title} isDone={task.isDone} onRemoveTaskHandler={()=>action('remove task')} onChangeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
}
