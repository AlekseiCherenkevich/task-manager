import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitle, removeTask} from "../../../../store/tasks-reducer";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = {
    todolistId: string
    id: string
    title: string
    isDone: boolean
}

export const Task: FC<TaskPropsType> = memo( ({todolistId, id, title, isDone}) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTask(todolistId, id))
    },[dispatch, todolistId, id])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(todolistId, id, e.currentTarget.checked))
    },[dispatch, todolistId, id])

    const changeTaskTitleHandler = useCallback((taskTitle: string) => {
        dispatch(changeTaskTitle(todolistId, id, taskTitle))
    },[dispatch, todolistId, id])

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
})
