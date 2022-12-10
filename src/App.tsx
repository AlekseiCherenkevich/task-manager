import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {
    addNewTodolistAC,
    changeTodolistFilterAC, changeTodolistSortAC, changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, SortValuesType,
    TodolistType
} from "./store/todolists-reducer";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {Todolist} from "./components/Todolist/Todolist";
import Input from "./components/common/Input/Input"


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)
    useEffect(()=>{
        localStorage.setItem('todolists', JSON.stringify(todolists))
    },[todolists])

    const addNewTodolist = (todolistTitle: string) => {
        dispatch(addNewTodolistAC(todolistTitle))
    }
    const removeTodolist = (todolistId: string) => () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeFilter = (todolistId: string) => (filter: FilterValuesType) => () => dispatch(changeTodolistFilterAC(todolistId, filter))
    const changeSort = (todolistId: string) => (sort: SortValuesType) => () => dispatch(changeTodolistSortAC(todolistId, sort))
    const changeTodolistTitle = (todolistId: string) => (todolistTitle: string) => dispatch(changeTodolistTitleAC(todolistId, todolistTitle))

    const addNewTask = (todolistId: string) => (taskTitle: string) => {
        dispatch(addNewTaskAC(todolistId, taskTitle))
    }
    const removeTask = (todolistId: string) => (taskId: string) => () => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const changeTaskStatus = (todolistId: string) => (taskId: string) => (taskStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId ,taskStatus))
    }
    const changeTaskTitle = (todolistId: string) => (taskId: string) => (taskTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, taskTitle))
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
                removeTask={removeTask(l.id)}
                changeFilter={changeFilter(l.id)}
                changeSort={changeSort(l.id)}
                addNewTask={addNewTask(l.id)}
                changeTaskStatus={changeTaskStatus(l.id)}
                changeTodolistTitle={changeTodolistTitle(l.id)}
                changeTaskTitle={changeTaskTitle(l.id)}
            />)}

        </div>
    );
}



export default App;
