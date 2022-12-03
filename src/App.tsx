import React, {useEffect} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './TodoList/Todolist';
import {Input} from "./common/Input/Input";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setNewTodoListIDToKeyAC
} from "./reducers/tasksReducer";
import {
    addNewTodoListAC,
    changeFilterValueAC,
    changeSortValueAC,
    changeTodoTitleValueAC,
    removeTodoListAC
} from "./reducers/todoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'completed' | 'active'
export type SortValuesType = 'default' | 'A-z' | 'Z-a'

function App() {
    const dispatch = useDispatch()

    const tasks = useSelector<RootReducerType, TasksType>(state=>state.tasks)
    const todolists = useSelector<RootReducerType, TodoListType[]>(state => state.todoLists)


    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('todoLists', JSON.stringify(todolists))
    },[tasks, todolists])


    const addNewTodoList = (todoTitle: string) => {
        const newTodoID = v1();
        dispatch(addNewTodoListAC(todoTitle, newTodoID))
        dispatch(setNewTodoListIDToKeyAC(newTodoID))
    }
    const addNewTask = (todoListID: string) => (taskTitle: string) => {
        dispatch(addNewTaskAC(todoListID, taskTitle))
    }
    const removeTodoList = (todoListID: string) => () => {
        dispatch(removeTodoListAC(todoListID))
        delete tasks[todoListID]
    }
    const removeTask = (todoListID: string) => (taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))

    }
    const changeTaskStatus = (todoListID: string) => (taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListID, taskID, isDone))
    }
    const filterTasks = (tasks: TaskType[], filter: FilterValuesType) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }
    const changeFilterValue = (todoListID: string) => (filterValue: FilterValuesType) => {
        // dispatchTodolists(changeFilterValueAC(todoListID,filterValue))
        dispatch(changeFilterValueAC(todoListID,filterValue))
    }
    const sortTasks = (tasks: TaskType[], sort: SortValuesType) => {
        switch (sort) {
            case "A-z":
                return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
            case "Z-a":
                return [...tasks].sort((a, b) => b.title.localeCompare(a.title))
            default:
                return tasks
        }
    }
    const changeSortValue = (todoListID: string) => (sort: SortValuesType) => {
        dispatch(changeSortValueAC(todoListID,sort))
    }
    const changeTodoTitleValue = (todoListID: string) => (title: string) => {
        dispatch(changeTodoTitleValueAC(todoListID, title))
    }
    const changeTaskTitle = (todoListID: string) => (taskID: string) => (taskTitle: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskID, taskTitle))
    }



    return (
        <div className="App">
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input callback={addNewTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((tl: TodoListType) => {
                        const filteredTasks = filterTasks(tasks[tl.id], tl.filter)
                        const sortedTasks = sortTasks(filteredTasks, tl.sort)
                        return <Grid item>
                            <Paper elevation={3} style={{padding: '20px'}}>
                                <Todolist
                                    todoTitle={tl.title}
                                    tasks={sortedTasks}
                                    filter={tl.filter}
                                    sort={tl.sort}
                                    addNewTask={addNewTask(tl.id)}
                                    removeTodoList={removeTodoList(tl.id)}
                                    removeTask={removeTask(tl.id)}
                                    changeTaskStatus={changeTaskStatus(tl.id)}
                                    changeFilterValue={changeFilterValue(tl.id)}
                                    changeSortValue={changeSortValue(tl.id)}
                                    changeTodoTitleValue={changeTodoTitleValue(tl.id)}
                                    changeTaskTitle={changeTaskTitle(tl.id)}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;