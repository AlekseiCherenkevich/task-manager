import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitle, removeTask} from "../store/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

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
        <Checkbox checked={isDone}
                  size={"small"}
               onChange={changeTaskStatusHandler}
               style={{transform: 'translateY(-7px)'}}
        />
        <EditableSpan value={title}
                      callback={changeTaskTitleHandler}
                      variant={"body1"}
                      fontSize={'16px'}
        />
        <IconButton size={"small"}
                    onClick={removeTaskHandler}
                    color={"error"}
                    style={{transform: 'translateY(-7px)'}}
        >
            <DeleteIcon/>
        </IconButton>
    </div>
}