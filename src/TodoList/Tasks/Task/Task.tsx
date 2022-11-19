import React, {ChangeEvent} from "react";
import {Button} from "../../../common/Button/Button";

type TaskPropsType = {
    title: string
    isDone: boolean
    onRemoveTaskHandler: () => void
    onChangeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    return <li>
        <input type="checkbox" checked={props.isDone} onChange={props.onChangeTaskStatus}/>
        <span>{props.title}</span>
        <Button onClick={props.onRemoveTaskHandler}>x</Button>
    </li>
}