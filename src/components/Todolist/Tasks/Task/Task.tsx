import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = {
    taskTitle: string
    isDone: boolean
    removeTask: () => void
    changeTaskStatus: (taskStatus: boolean) => void
    changeTaskTitle: (taskTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = ({taskTitle, isDone, removeTask, changeTaskStatus, changeTaskTitle}) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(e.currentTarget.checked)

    return <TaskStyle>
        <Checkbox color="success" checked={isDone} onChange={changeTaskStatusHandler} style={{transform: 'translateY(-2px)'}}/>
        <EditableSpan value={taskTitle} callback={changeTaskTitle}/>
        <IconButton onClick={removeTask} size={"small"}><DeleteIcon/></IconButton>
    </TaskStyle>
}

const TaskStyle = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  height: 40px;
  padding-top: 10px;
`