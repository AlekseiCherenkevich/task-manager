import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistSortAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    SortValuesType,
    TodolistType
} from "./store/todolists-reducer";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {Todolist} from "./components/Todolist/Todolist";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NewTodolistInput} from './components/NewTodolistInput/NewTodolistInput';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)
    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists))
    }, [todolists])

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
        dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus))
    }
    const changeTaskTitle = (todolistId: string) => (taskId: string) => (taskTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, taskTitle))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container mt={2}>
                    <Grid item>
                        <Paper style={{padding: ' 30px'}}>
                            <NewTodolistInput addNewTodolist={addNewTodolist}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={4} mt={2}>
                    {todolists.map(l =>
                        <Grid item>
                            <Paper style={{padding: '30px'}}>
                                <Todolist
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
                                />
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
