import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitle, removeTask} from "../store/tasks-reducer";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    todolistId: string
    id: string
    title: string
    isDone: boolean
}

export const Task: React.FC<TaskPropsType> = ({todolistId, id, title, isDone}) => {
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTask(todolistId, id))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(todolistId, id, e.currentTarget.checked))
    }

    const changeTaskTitleHandler = (taskTitle: string) => {
        dispatch(changeTaskTitle(todolistId, id, taskTitle))
    }

    return <div key={id} style={{display: 'flex'}}>
        <input checked={isDone} onChange={changeTaskStatusHandler} type="checkbox"/>
        <EditableSpan value={title} callback={changeTaskTitleHandler}/>
        <button onClick={removeTaskHandler}>-</button>
    </div>
}