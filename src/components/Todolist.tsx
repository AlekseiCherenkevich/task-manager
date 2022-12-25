import React from 'react';
import {addNewTask, TasksType} from "../store/tasks-reducer";
import {
    changeTodolistFilter,
    changeTodolistSort,
    changeTodolistTitle,
    FilterValuesType,
    removeTodolist,
    SortValuesType
} from "../store/todolists-reducer";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {Task} from './Task';
import {EditableSpan} from './EditableSpan';
import {FilteringButtonsGroup} from './FilteringButtonsGroup';

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
    const changeTodolistTitleHandler = (todolistTitle: string) => {
        dispatch(changeTodolistTitle(id, todolistTitle))
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
                <EditableSpan value={title} callback={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>-</button>
            </div>

            <div>
                <AddItemForm onClick={addNewTaskHandler}/>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <button onClick={changeTodolistSortHandler("default")}>Default</button>
            <button onClick={changeTodolistSortHandler("A-z")}>A-z</button>
            <button onClick={changeTodolistSortHandler("z-A")}>z-A</button>
        </div>
        <div style={{minHeight: '50px'}}>
            {filteredSortedTasks.map(t => {
                return <Task todolistId={id} {...t}/>
            })}
            {filteredSortedTasks.length===0 && <div style={{textAlign: 'center'}}>Tasks not found</div>}
        </div>
        <FilteringButtonsGroup filter={filter} callback={changeTodolistFilterHandler}/>
    </div>
}



