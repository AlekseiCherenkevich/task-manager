import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {addNewTodolistAC, removeTodolistAC, TodolistType} from "./store/todolists-reducer";
import {addEmptyTasksArrayAC} from "./store/tasks-reducer";
import {Todolist} from "./components/Todolist/Todolist";


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)


    const addNewTodolist = () => {
        const newTodolistId = v1()
        dispatch(addNewTodolistAC(newTodolistId, 'newww todolist'))
        dispatch(addEmptyTasksArrayAC(newTodolistId))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    return (
        <div className="App">
            <div>
                <input type="text"/>
                <button onClick={addNewTodolist}>+</button>
            </div>
            {todolists.map(l => <Todolist
                key={l.id}
                todolistId={l.id}
                todolistTitle={l.title}
                filter={l.filter}
                sort={l.sort}
                removeTodolist={removeTodolist}
            />)}

        </div>
    );
}



export default App;
