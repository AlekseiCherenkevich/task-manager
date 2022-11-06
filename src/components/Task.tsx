import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type TaskPropsType = {
    todoListIdx: number
    taskTitle: string
    taskID: string
    isDone: boolean
    removeTask: (todoListIdx: number, taskID: string) => void
    changeTaskStatus: (todoListIdx: number, taskID: string, status: boolean) => void
    changeTaskTitle: (todoListIdx: number, taskID: string, taskNewTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const {todoListIdx,
        taskTitle,
        taskID,
        isDone,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [taskNewTitle, setTaskNewTitle] = useState<string>(taskTitle)

    const activateEditMode = () => setIsEditMode(true)
    const deactivateEditMode = () => setIsEditMode(false)

    const onClickRemoveTaskHandler = () => {
        removeTask(todoListIdx, taskID)
    }
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListIdx, taskID, e.currentTarget.checked)
    }
    const onChangeTaskNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskNewTitle(e.currentTarget.value)
    }
    const onEnterPressSetTaskNewTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            if (taskNewTitle.trim()) {
                changeTaskTitle(todoListIdx, taskID, taskNewTitle)
            }
            deactivateEditMode()
            // setTaskNewTitle('')
        }
    }
    return <li key={taskID} className={isDone ? 'completedTask' : ''}>
        <input
            type="checkbox"
            checked={isDone}
            onChange={onChangeTaskStatusHandler}
        />
        {isEditMode
            ? <input
                type="text"
                className='editModeTaskTitleInput'
                value={taskNewTitle}
                onChange={onChangeTaskNewTitleHandler}
                onBlur={deactivateEditMode}
                onKeyPress={onEnterPressSetTaskNewTitle}
                autoFocus={true}
            />
            : <span
                onDoubleClick={activateEditMode}
            >{taskTitle}</span>}
        <button onClick={onClickRemoveTaskHandler}>-</button>
    </li>
}