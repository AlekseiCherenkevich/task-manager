import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodoListType} from "../App";
import {TodoListTitle} from "./TodoListTitle";
import {Tasks} from "./Tasks";
import {Filters} from "./Filters";

type TodoListPropsType = {
    todoList: TodoListType
    todoListIdx: number
    addNewTask: (todoListIdx: number, newTaskTitle: string) => void
    removeTask: (todoListIdx: number, taskID: string) => void
    changeTaskStatus: (todoListIdx: number, taskID: string, status: boolean) => void
    changeTodoListTitle: (todoListIdx: number, todoListTitle: string) => void
    changeTaskTitle: (todoListIdx: number, taskID: string, taskNewTitle: string) => void
    removeTodoList: (todoListIdx: number) => void
}
export type FilterValuesType = 'all' | 'completed' | 'active'
export type SortValuesType = 'default' | 'A-z' | 'Z-a'

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {todoList,
        todoListIdx,
        addNewTask,
        removeTask,
        changeTaskStatus,
        changeTodoListTitle,
        changeTaskTitle,
        removeTodoList} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [sort, setSort] = useState<SortValuesType>('default')

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
    const onChangeSortValue = (sort: SortValuesType) => () => setSort(sort)
    const filterTasks = () => {
        if (filter === 'completed') {
            return todoList.tasks.filter(t=>t.isDone)
        }
        if (filter === 'active') {
            return todoList.tasks.filter(t=>!t.isDone)
        }
        return todoList.tasks
    }
    const sortTasks = () => {
        const tasksCopy = [...filterTasks()]
        if (sort === "A-z") {
            return tasksCopy.sort((a,b)=> a.taskTitle.localeCompare(b.taskTitle))
        }
        if (sort === 'Z-a') {
            return tasksCopy.sort((a,b)=> b.taskTitle.localeCompare(a.taskTitle))
        }
        return tasksCopy
    }


    return <div className='todoListWrapper'>
        <div className='topSection'>
            <TodoListTitle
                todoListIdx={todoListIdx}
                todoTitle={todoList.todoTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
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
        <div>
            <button onClick={onChangeSortValue("default")}>Default</button>
            <button onClick={onChangeSortValue("A-z")}>A-z</button>
            <button onClick={onChangeSortValue("Z-a")}>Z-a</button>
        </div>
        <Tasks
            todoListIdx={todoListIdx}
            filteredSortedTasks={sortTasks()}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
        <Filters filter={filter} onChangeFilterValue={onChangeFilterValue}/>
        <button onClick={() => removeTodoList(todoListIdx)}>-</button>
    </div>
}




export default TodoList