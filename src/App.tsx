import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {addNewTodolistAC, removeTodolistAC, TodolistType} from "./store/todolists-reducer";
import {addNewTaskAC, removeTaskAC} from "./store/tasks-reducer";
import {Todolist} from "./components/Todolist/Todolist";
import Input from "./components/common/Input/Input"


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)



    const addNewTodolist = (todolistTitle: string) => {
        dispatch(addNewTodolistAC(todolistTitle))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }


    const addNewTask = (todolistId: string) => (taskTitle: string) => {
        dispatch(addNewTaskAC(todolistId, taskTitle))
    }
    const removeTask = (todolistId: string) => (taskId: string) => () => {
        dispatch(removeTaskAC(todolistId, taskId))
    }


    return (
        <div className="App">
            <div>
                <Input callback={addNewTodolist}/>

            </div>
            {todolists.map(l => <Todolist
                key={l.id}
                todolistId={l.id}
                todolistTitle={l.title}
                filter={l.filter}
                sort={l.sort}
                removeTodolist={removeTodolist}
                addNewTask={addNewTask(l.id)}
                removeTask={removeTask(l.id)}
            />)}

        </div>
    );
}



export default App;
