import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodoListType} from "../App";

type TodoListPropsType = {
    todoList: TodoListType
    todoListIdx: number
    addNewTask: (todoListIdx: number, newTaskTitle: string) => void
    removeTask: (todoListIdx: number, taskID: string) => void
    changeTaskStatus: (todoListIdx: number, taskID: string, status: boolean) => void
}

type FilterValuesType = 'all' | 'completed' | 'active'

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {todoList, todoListIdx, addNewTask, removeTask, changeTaskStatus} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const clearError = () => setError('')
    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addNewTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addNewTask(todoListIdx, newTaskTitle)
            setNewTaskTitle('')
            clearError()
        } else {
            setError('Field is required!')
        }
    }
    const onKeyPressAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTaskHandler()
        }
    }
    const onChangeFilterValue = (filter: FilterValuesType) => () => setFilter(filter)
    const filterTasks = () => {
        if (filter === 'completed') {
            return todoList.tasks.filter(t=>t.isDone)
        }
        if (filter === 'active') {
            return todoList.tasks.filter(t=>!t.isDone)
        }
        return todoList.tasks
    }

    return <div>
        <div className='topSection'>
            <h3>{todoList.todoTitle}</h3>
            <button>+</button>
        </div>


        <div>
            <input
                value={newTaskTitle}
                onChange={onChangeNewTaskTitleHandler}
                onKeyPress={onKeyPressAddNewTaskHandler}
                onBlur={clearError}
            />
            <button
                onClick={addNewTaskHandler}
                onBlur={clearError}
            >+</button>
        </div>
        {error && <div className='error'>{error}</div>}
        <ul>
            {filterTasks().map(t=>{
                const onClickRemoveTaskHandler = () => {
                    removeTask(todoListIdx, t.taskID)
                }
                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(todoListIdx, t.taskID, e.currentTarget.checked)
                }

                return <li key={t.taskID} className={t.isDone ? 'completedTask' : ''}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeTaskStatusHandler}
                    />
                    <span>{t.taskTitle}</span>
                    <button onClick={onClickRemoveTaskHandler}>-</button>
                </li>
            })}
        </ul>
        <div>
            <button className={filter==='all' ? 'activeButton' : ''} onClick={onChangeFilterValue("all")}>All</button>
            <button className={filter==='active' ? 'activeButton' : ''} onClick={onChangeFilterValue("active")}>Active</button>
            <button className={filter==='completed' ? 'activeButton' : ''} onClick={onChangeFilterValue('completed')}>Completed</button>
        </div>
    </div>
}

export default TodoList