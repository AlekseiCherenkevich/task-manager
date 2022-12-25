import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addNewTodolist, TodolistType} from "./store/todolists-reducer";
import {AppStateType} from "./store/store";
import './App.css'
import {AddItemForm} from "./components/AddItemForm";
import {Todolist} from "./components/Todolist";

export const App = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, TodolistType[]>(state=>state.todolists)


    const addNewTodolistHandler = (todolistTitle: string) => {
        dispatch(addNewTodolist(todolistTitle))
    }

    return (
        <div>
            <AddItemForm onClick={addNewTodolistHandler}/>
            <div>
                {todolists.map(tl=>{
                    return <Todolist {...tl}/>
                })}
            </div>

        </div>
    );
};


