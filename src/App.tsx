import {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import './App.css'
import {Todolist} from "./components/Todolist/Todolist";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AddTodoListForm} from "./components/AddTodoListForm/AddTodoListForm";
import {Header} from "./components/Header/Header";
import {TodolistEntityType} from "./store/todolists-reducer";

export const App = () => {
    const todolists = useSelector<AppStateType, TodolistEntityType[]>(state => state.todolists)

    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists))
    }, [todolists])

    return (
        <div>
            <Header/>
            <Container fixed>
                <AddTodoListForm/>
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


