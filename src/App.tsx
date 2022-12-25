import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addNewTodolist, TodolistType} from "./store/todolists-reducer";
import {AppStateType} from "./store/store";
import './App.css'
import {AddItemForm} from "./components/AddItemForm";
import {Todolist} from "./components/Todolist";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const App = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, TodolistType[]>(state => state.todolists)


    const addNewTodolistHandler = (todolistTitle: string) => {
        dispatch(addNewTodolist(todolistTitle))
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="small"
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
                <Grid container style={{marginTop: '20px'}}>
                    <Grid item>
                        <Paper style={{padding: '20px 20px 0 20px'}} elevation={8}>
                            <AddItemForm onClick={addNewTodolistHandler} placeholder={'Enter todo`s title'}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{marginTop: '20px'}}>

                    {todolists.map(tl => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '20px'}} elevation={8}>
                                    <Todolist {...tl}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

                <div>

                </div>
            </Container>
        </div>
    );
};


