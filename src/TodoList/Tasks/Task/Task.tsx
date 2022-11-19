import React, {ChangeEvent} from "react";
import {Button} from "../../../common/Button/Button";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";

type TaskPropsType = {
    title: string
    isDone: boolean
    onRemoveTaskHandler: () => void
    onChangeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitle: (taskTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    return <li>
        <input type="checkbox" checked={props.isDone} onChange={props.onChangeTaskStatus}/>
        {/*<span>{props.title}</span>*/}
        <EditableSpan value={props.title} callback={props.changeTaskTitle}/>
        <Button onClick={props.onRemoveTaskHandler}>x</Button>
    </li>
}