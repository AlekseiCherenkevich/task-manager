import React from 'react';
import {addNewTask, TasksType} from "../store/tasks-reducer";
import {
    changeTodolistFilter,
    changeTodolistSort,
    FilterValuesType,
    removeTodolist,
    SortValuesType
} from "../store/todolists-reducer";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {Task} from './Task';

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}

export const Todolist: React.FC<TodolistPropsType> = ({id, title, filter, sort}) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    const addNewTaskHandler = (taskTitle: string) => {
        dispatch(addNewTask(id, taskTitle))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolist(id))
    }
    const changeTodolistFilterHandler = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilter(id, filter))
    }
    const changeTodolistSortHandler = (sort: SortValuesType) => () => {
        dispatch(changeTodolistSort(id, sort))
    }

    let filteredSortedTasks = tasks[id]

    if (filter === "active") {
        filteredSortedTasks = filteredSortedTasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredSortedTasks = filteredSortedTasks.filter(t => t.isDone)
    }
    if (sort === "A-z") {
        filteredSortedTasks = [...filteredSortedTasks].sort((a, b) => a.title.localeCompare(b.title))
    }
    if (sort === "z-A") {
        filteredSortedTasks = [...filteredSortedTasks].sort((a, b) => b.title.localeCompare(a.title))
    }

    return <div key={id}>
        <div>
            <div style={{display: 'flex'}}>
                <h5>{title}</h5>
                <button onClick={removeTodolistHandler}>-</button>
            </div>
            <div>
                <AddItemForm onClick={addNewTaskHandler}/>
            </div>
        </div>
        <div>
            <button onClick={changeTodolistSortHandler("default")}>Default</button>
            <button onClick={changeTodolistSortHandler("A-z")}>A-z</button>
            <button onClick={changeTodolistSortHandler("z-A")}>z-A</button>
        </div>
        <div>
            {filteredSortedTasks.map(t => {
                return <Task todolistId={id} {...t}/>
            })}
        </div>
        <div>
            <button onClick={changeTodolistFilterHandler("all")}>All</button>
            <button onClick={changeTodolistFilterHandler("active")}>Active</button>
            <button onClick={changeTodolistFilterHandler("completed")}>Completed</button>
        </div>
    </div>
}


