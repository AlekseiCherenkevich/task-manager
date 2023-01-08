import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitle, removeTask, TaskStatuses, TaskType} from "../../../../store/tasks-reducer";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export const Task: FC<TaskType> = memo( ({todoListId, id, title, status}) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTask(todoListId, id))
    },[dispatch, todoListId, id])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(changeTaskStatus(todoListId, id, status))
    },[dispatch, todoListId, id])

    const changeTaskTitleHandler = useCallback((taskTitle: string) => {
        dispatch(changeTaskTitle(todoListId, id, taskTitle))
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
