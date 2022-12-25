import React, {useEffect} from 'react';
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
import {SortingButtonsGroup} from "./SortingButtonsGroup";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}

export const Todolist: React.FC<TodolistPropsType> = ({id, title, filter, sort}) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

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
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <EditableSpan value={title} callback={changeTodolistTitleHandler} variant={"h6"} fontSize={'20px'}/>
                <IconButton size={"small"} color={"error"} style={{transform: 'translateY(-5px)'}}>
                    <DeleteIcon onClick={removeTodolistHandler}/>
                </IconButton>
            </div>
            <AddItemForm onClick={addNewTaskHandler} placeholder={'Enter task'}/>
        </div>
        <SortingButtonsGroup sort={sort} callback={changeTodolistSortHandler}/>
        <div style={{minHeight: '50px', marginTop: '10px', paddingLeft: '20px'}}>
            {filteredSortedTasks.map(t => {
                return <Task todolistId={id} {...t}/>
            })}
            {filteredSortedTasks.length===0 && <Typography variant={"body1"} style={{paddingLeft: '30px'}}>Tasks not found</Typography>}
        </div>
        <FilteringButtonsGroup filter={filter} callback={changeTodolistFilterHandler}/>
    </div>
}



