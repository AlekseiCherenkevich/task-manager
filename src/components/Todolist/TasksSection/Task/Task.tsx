import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {removeTaskTC, TaskStatuses, updateTaskTC} from "../../../../store/tasks-reducer";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TaskRequestType, TaskType} from "../../../../api/api";
import {useAppDispatch} from "../../../../store/store";

type TaskPropsType = {
    task: TaskType
}

export const Task: FC<TaskPropsType> = memo( ({task}) => {
    const {id, status, todoListId, title, description, priority, startDate, deadline} = task
    const dispatch = useAppDispatch()

    let requestTask: TaskRequestType = {title, description, priority, status, deadline, startDate}

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC(todoListId, id))
    },[dispatch, todoListId, id])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todoListId, id, {...requestTask, status}))
    },[dispatch, todoListId, id])

    const changeTaskTitleHandler = useCallback((taskTitle: string) => {
        dispatch(updateTaskTC(todoListId, id, {...requestTask, title: taskTitle}))
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
