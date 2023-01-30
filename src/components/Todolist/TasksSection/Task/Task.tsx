import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStatuses} from "../../../../store/tasks-reducer";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TaskType} from "../../../../api/api";

export const Task: FC<TaskType> = memo( ({todoListId, id, title, status}) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(todoListId, id))
    },[dispatch, todoListId, id])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(changeTaskStatusAC(todoListId, id, status))
    },[dispatch, todoListId, id])

    const changeTaskTitleHandler = useCallback((taskTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, taskTitle))
    },[dispatch, todoListId, id])

    return <div key={id} style={{display: 'flex'}}>
        <Checkbox checked={status === TaskStatuses.Completed}
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
