import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatus, removeTask} from "../store/tasks-reducer";

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


    return <div key={id}>
        <input checked={isDone} onChange={changeTaskStatusHandler} type="checkbox"/>
        <span>{title}</span>
        <button onClick={removeTaskHandler}>-</button>
    </div>
}