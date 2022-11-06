import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from "react";
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
    addNewTodoList: () => void
    changeTodoListTitle: (todoListIdx: number, todoListTitle: string) => void
}
export type FilterValuesType = 'all' | 'completed' | 'active'

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {todoList,
        todoListIdx,
        addNewTask,
        removeTask,
        changeTaskStatus,
        addNewTodoList,
        changeTodoListTitle} = props

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
            <TodoListTitle
                todoListIdx={todoListIdx}
                todoTitle={todoList.todoTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
            <button onClick={addNewTodoList}>+</button>
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
        <Tasks
            todoListIdx={todoListIdx}
            filteredTasks={filterTasks()}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
        />
        <Filters filter={filter} onChangeFilterValue={onChangeFilterValue}/>
    </div>
}




export default TodoList