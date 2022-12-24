import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addNewTodolist, removeTodolist, TodolistType} from "./store/todolists-reducer";
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
                            <button>Default</button>
                            <button>A-z</button>
                            <button>z-A</button>
                        </div>
                        <div>
                            {tasks[tl.id].map(t=>{
                                const removeTaskHandler = () => {
                                    dispatch(removeTask(tl.id, t.id))
                                }
                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    dispatch(changeTaskStatus(tl.id, t.id, e.currentTarget.checked))
                                }

                                return <div key={t.id}>
                                    <input onChange={changeTaskStatusHandler} type="checkbox"/>
                                    <span>{t.title}</span>
                                    <button onClick={removeTaskHandler}>-</button>
                                </div>
                            })}
                        </div>
                        <div>
                            <button>All</button>
                            <button>Active</button>
                            <button>Completed</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};


