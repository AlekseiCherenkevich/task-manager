import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './TodoList/Todolist';
import {Input} from "./common/Input/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type TodoListType = {
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
type TasksType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'completed' | 'active'
export type SortValuesType = 'default' | 'A-z' | 'Z-a'

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodoListType[]>(checkLocalStorage('todoLists'))
    let [tasks, setTasks] = useState<TasksType>(checkLocalStorage('tasks'));

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('todoLists', JSON.stringify(todolists))
    },[tasks, todolists])

    function checkLocalStorage(key: string) {
        const dataFromLocalStorage = localStorage.getItem(key)
        if (dataFromLocalStorage) {
            return JSON.parse(dataFromLocalStorage)
        } else {
            if (key === 'tasks') {
                return {
                    [todolistId1]: [
                        {id: v1(), title: "HTML&CSS", isDone: true},
                        {id: v1(), title: "JS", isDone: true}
                    ],
                    [todolistId2]: [
                        {id: v1(), title: "Milk", isDone: true},
                        {id: v1(), title: "React Book", isDone: true}
                    ]
                }
            } else {
                return [
                    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
                    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
                ]
            }
        }
    }

    const addNewTodoList = (todoTitle: string) => {
        const newTodoID = v1()
        setTodolists([...todolists, {id: newTodoID, title: todoTitle, filter: "all", sort: "default"}])
        setTasks({...tasks, [newTodoID]: []})
    }
    const addNewTask = (todoListID: string) => (taskTitle: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title: taskTitle, isDone: false}, ...tasks[todoListID]]})
    }
    const removeTodoList = (todoListID: string) => () => {
        setTodolists(todolists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const removeTask = (todoListID: string) => (taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const changeTaskStatus = (todoListID: string) => (taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
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
        setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter: filterValue} : tl))
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
    const changeSortValue = (todoListID: string) => (sort: SortValuesType) => setTodolists(todolists.map(tl => tl.id === todoListID ? {
        ...tl,
        sort: sort
    } : tl))
    const changeTodoTitleValue = (todoListID: string) => (title: string) => setTodolists(todolists.map(tl => tl.id === todoListID ? {
        ...tl,
        title: title
    } : tl))
    const changeTaskTitle = (todoListID: string) => (taskID: string) => (taskTitle: string) => setTasks({
        ...tasks,
        [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: taskTitle} : t)
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input callback={addNewTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        const filteredTasks = filterTasks(tasks[tl.id], tl.filter)
                        const sortedTasks = sortTasks(filteredTasks, tl.sort)
                        return <Grid item>
                            <Paper style={{padding: '20px'}}>
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