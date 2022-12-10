import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {
    addNewTodolistAC,
    changeTodolistFilterAC, changeTodolistSortAC,
    FilterValuesType,
    removeTodolistAC, SortValuesType,
    TodolistType
} from "./store/todolists-reducer";
import {addNewTaskAC, removeTaskAC} from "./store/tasks-reducer";
import {Todolist} from "./components/Todolist/Todolist";
import Input from "./components/common/Input/Input"


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)

    const addNewTodolist = (todolistTitle: string) => {
        dispatch(addNewTodolistAC(todolistTitle))
    }
    const removeTodolist = (todolistId: string) => () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeFilter = (todolistId: string) => (filter: FilterValuesType) => () => dispatch(changeTodolistFilterAC(todolistId, filter))
    const changeSort = (todolistId: string) => (sort: SortValuesType) => () => dispatch(changeTodolistSortAC(todolistId, sort))

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
                removeTodolist={removeTodolist(l.id)}
                addNewTask={addNewTask(l.id)}
                removeTask={removeTask(l.id)}
                changeFilter={changeFilter(l.id)}
                changeSort={changeSort(l.id)}
            />)}

        </div>
    );
}



export default App;
