import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {addNewTodolistAC, removeTodolistAC, TodolistType} from "./store/todolists-reducer";
import {addEmptyTasksArrayAC, addNewTaskAC} from "./store/tasks-reducer";
import {Todolist} from "./components/Todolist/Todolist";
import Input from "./components/common/Input/Input"


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)

    const [todolistTitle, setTodolistTitle] = useState('')

    const addNewTodolist = () => {
        const newTodolistId = v1()
        dispatch(addNewTodolistAC(newTodolistId, todolistTitle))
        dispatch(addEmptyTasksArrayAC(newTodolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }


    const addNewTask = (todolistId: string) => (taskTitle: string) => {
        dispatch(addNewTaskAC(todolistId, taskTitle))
    }

    return (
        <div className="App">
            <div>
                <Input value={todolistTitle} onKeyPress={addNewTodolist} onChange={setTodolistTitle}/>
                <button onClick={addNewTodolist}>+</button>
            </div>
            {todolists.map(l => <Todolist
                key={l.id}
                todolistId={l.id}
                todolistTitle={l.title}
                filter={l.filter}
                sort={l.sort}
                removeTodolist={removeTodolist}
                addNewTask={addNewTask(l.id)}
            />)}

        </div>
    );
}



export default App;
