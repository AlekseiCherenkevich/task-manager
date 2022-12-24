import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addNewTodolist,
    changeTodolistFilter, changeTodolistSort,
    FilterValuesType,
    removeTodolist, SortValuesType,
    TodolistType
} from "./store/todolists-reducer";
import {AppStateType} from "./store/store";
import {addNewTask, changeTaskStatus, removeTask, TasksType} from "./store/tasks-reducer";
import './App.css'
import {AddItemForm} from "./components/AddItemForm";

export const App = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, TodolistType[]>(state=>state.todolists)
    const tasks = useSelector<AppStateType, TasksType>(state=>state.tasks)

    const addNewTodolistHandler = (todolistTitle: string) => {
        dispatch(addNewTodolist(todolistTitle))
    }



    return (
        <div>
            <AddItemForm onClick={addNewTodolistHandler}/>
            <div>
                {todolists.map(tl=>{
                    const addNewTaskHandler = (taskTitle: string)  => {
                        dispatch(addNewTask(tl.id, taskTitle))
                    }
                    const removeTodolistHandler = () => {
                        dispatch(removeTodolist(tl.id))
                    }
                    const changeTodolistFilterHandler = (filter: FilterValuesType) => () => {
                        dispatch(changeTodolistFilter(tl.id, filter))
                    }
                    const changeTodolistSortHandler = (sort: SortValuesType) => () => {
                        dispatch(changeTodolistSort(tl.id, sort))
                    }

                    let filteredSortedTasks = tasks[tl.id]

                    if (tl.filter === "active") {
                        filteredSortedTasks = filteredSortedTasks.filter(t=>!t.isDone)
                    }
                    if (tl.filter === "completed") {
                        filteredSortedTasks = filteredSortedTasks.filter(t=>t.isDone)
                    }
                    if (tl.sort === "A-z") {
                        filteredSortedTasks = [...filteredSortedTasks].sort((a,b)=>a.title.localeCompare(b.title))
                    }
                    if (tl.sort === "z-A") {
                        filteredSortedTasks = [...filteredSortedTasks].sort((a,b)=>b.title.localeCompare(a.title))
                    }

                    return <div key={tl.id}>
                        <div>
                            <div style={{display: 'flex'}}>
                                <h5>{tl.title}</h5>
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
                            {filteredSortedTasks.map(t=>{
                                const removeTaskHandler = () => {
                                    dispatch(removeTask(tl.id, t.id))
                                }
                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    dispatch(changeTaskStatus(tl.id, t.id, e.currentTarget.checked))
                                }



                                return <div key={t.id}>
                                    <input checked={t.isDone} onChange={changeTaskStatusHandler} type="checkbox"/>
                                    <span>{t.title}</span>
                                    <button onClick={removeTaskHandler}>-</button>
                                </div>
                            })}
                        </div>
                        <div>
                            <button onClick={changeTodolistFilterHandler("all")}>All</button>
                            <button onClick={changeTodolistFilterHandler("active")}>Active</button>
                            <button onClick={changeTodolistFilterHandler("completed")}>Completed</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};


