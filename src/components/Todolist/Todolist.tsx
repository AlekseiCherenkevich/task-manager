import React from 'react';
import {FilterValuesType, SortValuesType} from "../../store/todolists-reducer";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {TasksType} from "../../store/tasks-reducer";
import {Task} from './Task/Task';
import Input from "../common/Input/Input";

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterValuesType
    sort: SortValuesType
    removeTodolist: (todolistId: string) => void
    addNewTask: (taskTitle: string) => void
    removeTask: (taskId: string) => () => void
    changeFilter: (filter: FilterValuesType) => () => void
    changeSort: (sort: SortValuesType) => () => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {todolistId, todolistTitle, filter, sort, removeTodolist, addNewTask, removeTask, changeFilter, changeSort} = props
    const tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)

    const removeTodolistHandler = () => removeTodolist(todolistId)

    let filteredTasks = tasks[todolistId]

    if (filter === "active") {
        filteredTasks = tasks[todolistId].filter(t=>!t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks[todolistId].filter(t=>t.isDone)
    }
    let sortedTasks = filteredTasks
    if (sort === "A-z") {
        sortedTasks = [...filteredTasks].sort((a,b)=>a.title.localeCompare(b.title))
    }
    if (sort === "z-A") {
        sortedTasks = [...filteredTasks].sort((a,b)=>b.title.localeCompare(a.title))
    }

    return <div>
        <div>
            <h3>{todolistTitle}</h3>
            <button onClick={removeTodolistHandler}>-</button>
        </div>
        <div>
            <Input callback={addNewTask} />
        </div>
        <div>
            <button onClick={changeSort("default")}>Default</button>
            <button onClick={changeSort("A-z")}>A-z</button>
            <button onClick={changeSort("z-A")}>Z-a</button>
        </div>
        <div>
            {sortedTasks.map(t => {
                return <Task key={t.id} taskTitle={t.title} isDone={t.isDone} removeTask={removeTask(t.id)}/>
            })}
        </div>
        <div>
            <button onClick={changeFilter("all")}>All</button>
            <button onClick={changeFilter("completed")}>Completed</button>
            <button onClick={changeFilter("active")}>Active</button>
        </div>
    </div>
}

