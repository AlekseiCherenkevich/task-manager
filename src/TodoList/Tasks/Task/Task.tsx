import React, {ChangeEvent} from "react";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import Checkbox from '@mui/material/Checkbox';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    title: string
    isDone: boolean
    onRemoveTaskHandler: () => void
    onChangeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitle: (taskTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const {title, isDone, onRemoveTaskHandler, onChangeTaskStatus, changeTaskTitle} = props
    return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        width: 'fit-content', maxWidth: '80%'
    }}>
        <Checkbox checked={isDone} onChange={onChangeTaskStatus} color="success"/>
        <EditableSpan value={title} callback={changeTaskTitle}/>
        <IconButton onClick={onRemoveTaskHandler} size="small">
            <DeleteIcon fontSize="inherit" color="error"/>
        </IconButton>
    </div>
}